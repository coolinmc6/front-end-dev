---
title: MSW Integration — Jest + Playwright
sidebar_position: 3
---

# MSW Integration — Jest + Playwright

How Mock Service Worker connects with different testing tools, and the patterns that make each integration clean.

---

## 1. Jest Setup

Jest tests run in Node.js. MSW's `setupServer` creates an in-process request interceptor that patches `fetch`, `http.get`, and `XMLHttpRequest` — no actual server is started and no port is opened.

### Boilerplate

Create a shared server file that your Jest setup references:

```ts title="src/test/mocks/server.ts"
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

Then wire the server lifecycle into Jest:

```ts title="jest.setup.ts"
import { server } from './src/test/mocks/server';

// Start intercepting requests before all tests
beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  }),
);

// Reset any per-test handler overrides between tests
afterEach(() => server.resetHandlers());

// Stop intercepting after all tests are done
afterAll(() => server.close());
```

Reference this setup file in your Jest config:

```ts title="jest.config.ts"
export default {
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  // ...
};
```

### What Each Lifecycle Hook Does

| Hook | Method | Purpose |
|------|--------|---------|
| `beforeAll` | `server.listen()` | Patches Node's request modules. All outgoing requests are now intercepted. |
| `afterEach` | `server.resetHandlers()` | Removes handlers added via `server.use()` during a test. The original handlers passed to `setupServer()` are restored. |
| `afterAll` | `server.close()` | Unpatches Node's request modules. Requests behave normally again. |

### `onUnhandledRequest` Options

| Value | Behavior |
|-------|----------|
| `'warn'` | Logs a warning for requests that don't match any handler (recommended for development) |
| `'error'` | Throws an error — useful for strict test suites that should not make unmatched requests |
| `'bypass'` | Silently lets unmatched requests through to the actual network |
| Custom function | Receives the `Request` object so you can decide per-request |

:::tip[Best Practice]
Use `'warn'` during initial development and switch to `'error'` once your handler coverage is complete. This catches accidental real network calls in CI.
:::

---

## 2. Playwright Setup

Playwright runs tests in Node.js but drives a real browser. This distinction creates two possible interception points, and choosing the right one matters.

### Browser Interception — `setupWorker`

MSW's `setupWorker` registers a Service Worker inside the browser. It is designed for **development-time mocking** where your app runs in a real browser and you want intercepted requests to appear naturally in DevTools.

```ts title="src/test/mocks/browser.ts"
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

To use this in a Playwright test, your application must call `worker.start()` before making any requests. Typically this is done conditionally in your app's entry point:

```ts title="src/main.ts"
async function bootstrap() {
  if (process.env.NODE_ENV === 'test' || process.env.VITE_MSW === 'true') {
    const { worker } = await import('./test/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  // ... render your app
}

bootstrap();
```

You also need the MSW Service Worker file in your public directory:

```bash
npx msw init public/ --save
```

:::info[Playwright Note]
The `setupWorker` approach requires your application to bundle the MSW initialization code and the Service Worker file. This means MSW becomes part of your application's runtime in test mode, not just a test harness. For most E2E scenarios, Playwright's built-in `page.route()` (covered in Section 3) is simpler and avoids this coupling.
:::

### Node Interception — `setupServer`

You can also use `setupServer` in the Playwright test process itself. This intercepts requests made by your test code (e.g., API calls in `beforeEach` to seed data) but does **not** intercept requests made by the browser:

```ts title="playwright/global-setup.ts"
import { setupServer } from 'msw/node';
import { handlers } from '../src/test/mocks/handlers';

const server = setupServer(...handlers);

export default async function globalSetup() {
  server.listen();
  // seed test data via intercepted API calls if needed
}
```

:::caution[Next.js Gotcha]
If your Next.js app uses Server Components or `getServerSideProps`, those `fetch` calls run on the Next.js server process — not in the browser and not in the Playwright test process. Neither `setupWorker` nor `setupServer` in your test file can intercept them. See Section 5 for how to handle this.
:::

---

## 3. Playwright Alternative: `page.route()`

Playwright has a built-in network interception API that does not require MSW at all. For many E2E tests, it is the simpler choice.

### Basic Usage

```ts title="tests/checkout.spec.ts"
import { test, expect } from '@playwright/test';

test('shows item total on checkout page', async ({ page }) => {
  // Intercept the API call and return mock data
  await page.route('**/api/cart', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        items: [
          { id: 1, name: 'Widget', price: 9.99, quantity: 2 },
        ],
        total: 19.98,
      }),
    }),
  );

  await page.goto('/checkout');
  await expect(page.getByTestId('cart-total')).toHaveText('$19.98');
});
```

### Pattern Matching

`page.route()` accepts globs and regex:

```ts
// Glob — matches any path under /api/
await page.route('**/api/**', handler);

// Regex — matches specific endpoint with path params
await page.route(/\/api\/users\/\d+/, handler);
```

### Modifying Real Responses

Instead of replacing the response entirely, you can let the request go through and modify what comes back:

```ts
await page.route('**/api/user', async (route) => {
  const response = await route.fetch();
  const json = await response.json();

  // Inject a test flag into the real response
  json.featureFlags = { newCheckout: true };

  await route.fulfill({
    response,
    body: JSON.stringify(json),
  });
});
```

### Aborting Requests

Useful for testing offline states or blocked resources:

```ts
// Block all analytics calls
await page.route('**/analytics/**', (route) => route.abort());
```

### Comparison: MSW vs `page.route()`

| Feature | MSW (`setupWorker`) | Playwright `page.route()` |
|---------|---------------------|---------------------------|
| Where it runs | Inside the browser (Service Worker) | In the Playwright test process |
| Setup overhead | Service Worker file + app code changes | None — pure test code |
| Reusable in Jest | Yes (same handlers) | No (Playwright-only API) |
| DevTools visibility | Requests appear in Network tab | Requests appear in Network tab |
| Access to real response | No (intercept only) | Yes (`route.fetch()`) |
| Works without app changes | No | Yes |

:::info[Playwright Note]
For most E2E testing, `page.route()` is the pragmatic choice. It requires no changes to your application code, works out of the box, and gives you access to modify real responses. Reserve MSW's `setupWorker` for cases where you want to share the exact same handler definitions across unit and E2E tests.
:::

---

## 4. Sharing Handlers

If you use MSW in both Jest and Playwright (via `setupWorker`), you want a single source of truth for your mock responses.

### Recommended Directory Structure

```
src/
  test/
    mocks/
      handlers/
        auth.ts        # login, logout, session handlers
        users.ts       # user CRUD handlers
        products.ts    # product listing, detail handlers
        index.ts       # re-exports all handlers as a flat array
      server.ts        # setupServer(...handlers) for Jest / Node
      browser.ts       # setupWorker(...handlers) for browser / Playwright
```

### The Handler Index

```ts title="src/test/mocks/handlers/index.ts"
import { authHandlers } from './auth';
import { userHandlers } from './users';
import { productHandlers } from './products';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...productHandlers,
];
```

### Domain-Specific Handler File

```ts title="src/test/mocks/handlers/users.ts"
import { http, HttpResponse } from 'msw';

const BASE_URL = '/api/users';

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

export const userHandlers = [
  // List users
  http.get(BASE_URL, () => {
    return HttpResponse.json(mockUsers);
  }),

  // Get single user
  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const user = mockUsers.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json(
        { error: 'Not found' },
        { status: 404 },
      );
    }
    return HttpResponse.json(user);
  }),

  // Create user
  http.post(BASE_URL, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body },
      { status: 201 },
    );
  }),
];
```

### Server and Worker Entry Points

```ts title="src/test/mocks/server.ts"
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```ts title="src/test/mocks/browser.ts"
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

Both consume the same `handlers` array. Jest uses `server.ts`, the browser uses `browser.ts`.

---

## 5. Next.js Specifics

Next.js blurs the line between client and server, which creates unique challenges for MSW.

### Where Fetch Calls Run

| Code Location | Runs On | MSW `setupWorker` | MSW `setupServer` (test process) | `jest.mock` |
|---------------|---------|--------------------|---------------------------------|-------------|
| Client component `useEffect` | Browser | Intercepted | Not intercepted | N/A |
| Client component event handler | Browser | Intercepted | Not intercepted | N/A |
| `getServerSideProps` | Next.js server | Not intercepted | Not intercepted | Works |
| Server Component (App Router) | Next.js server | Not intercepted | Not intercepted | Works |
| Route Handler (`app/api/`) | Next.js server | Not intercepted | Not intercepted | Works |
| Middleware | Edge runtime | Not intercepted | Not intercepted | Works (with caveats) |

The key insight: MSW intercepts requests **in the process where it is initialized**. The Next.js server is a separate process from both your browser and your test runner.

:::caution[Next.js Gotcha]
`setupWorker` only intercepts browser-side `fetch`. `setupServer` in your test file only intercepts test-process `fetch`. Neither can reach into the Next.js server process where `getServerSideProps` and Server Components execute their data fetching.
:::

### Strategy for Server-Side Code

For `getServerSideProps`, Server Components, and Route Handlers, mock at the module level in your Jest tests:

```ts title="__tests__/dashboard.test.tsx"
// Mock the data-fetching module that getServerSideProps calls
jest.mock('../lib/api', () => ({
  fetchDashboardData: jest.fn().mockResolvedValue({
    widgets: [
      { id: 1, type: 'chart', title: 'Revenue' },
      { id: 2, type: 'table', title: 'Users' },
    ],
  }),
}));

import { getServerSideProps } from '../pages/dashboard';

test('getServerSideProps returns dashboard data', async () => {
  const result = await getServerSideProps({} as any);

  expect(result).toEqual({
    props: {
      widgets: expect.arrayContaining([
        expect.objectContaining({ type: 'chart' }),
      ]),
    },
  });
});
```

### Strategy for Client-Side Code

Client-side `fetch` calls work with MSW normally. Use `setupServer` in Jest tests:

```ts title="__tests__/user-profile.test.tsx"
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '../test/mocks/server';
import { http, HttpResponse } from 'msw';
import UserProfile from '../components/UserProfile';

test('renders user name from API', async () => {
  server.use(
    http.get('/api/user/me', () => {
      return HttpResponse.json({ name: 'Colin', role: 'admin' });
    }),
  );

  render(<UserProfile />);

  await waitFor(() => {
    expect(screen.getByText('Colin')).toBeVisible();
  });
});
```

### Recommended Split

| Layer | Tool | Why |
|-------|------|-----|
| Client-side data fetching | MSW `setupServer` in Jest | Intercepts `fetch` in the test process where JSDOM runs |
| Server-side data fetching | `jest.mock` on the data-fetching module | The only way to control what the server-side function receives |
| Full E2E (Playwright) | `page.route()` | Intercepts all requests the browser makes, regardless of whether the response came from the Next.js server or a third-party API |

:::caution[Next.js Gotcha]
If a Server Component fetches data and passes it as props to a Client Component, you do not need to mock the client component's `fetch`. The data arrives as props. Test the Server Component's data fetching with `jest.mock` and test the Client Component by passing props directly.
:::

---

## 6. Handler Organization

As your mock surface area grows, how you organize handlers matters as much as how you write them.

### Colocated Handlers

Place handlers next to the feature they belong to:

```
src/
  features/
    auth/
      components/
        LoginForm.tsx
        LoginForm.test.tsx
      mocks/
        handlers.ts      # auth-specific MSW handlers
      hooks/
        useAuth.ts
    products/
      components/
        ProductList.tsx
        ProductList.test.tsx
      mocks/
        handlers.ts      # product-specific MSW handlers
```

**Advantages:**
- Handlers stay close to the code that uses them
- Easy to find and update when the feature changes
- Encourages ownership — the feature author maintains the mocks

**Disadvantages:**
- Harder to compose a global handler array for `setupServer`
- Risk of duplicate or conflicting handlers across features

### Centralized Handlers

All handlers live in a shared mocks directory:

```
src/
  test/
    mocks/
      handlers/
        auth.ts
        users.ts
        products.ts
        index.ts
      server.ts
      browser.ts
```

**Advantages:**
- Single source of truth for all API mocks
- Easy to compose and deduplicate
- Clear separation between production code and test infrastructure

**Disadvantages:**
- Can become a large, monolithic directory
- Changes to a feature require updating a file far from the feature code

:::tip[Best Practice]
Start with centralized handlers. As the codebase grows past 20-30 handler files, consider a hybrid approach: colocate handlers with features but re-export them through a central index for `setupServer` and `setupWorker`.
:::

### Factory Pattern

For handlers that need flexible mock data, use factory functions:

```ts title="src/test/mocks/handlers/users.ts"
import { http, HttpResponse } from 'msw';

interface UserOverrides {
  id?: string;
  name?: string;
  email?: string;
  role?: 'admin' | 'user' | 'guest';
}

export function createUserHandlers(overrides: UserOverrides = {}) {
  const defaultUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user' as const,
    ...overrides,
  };

  return [
    http.get('/api/user/me', () => {
      return HttpResponse.json(defaultUser);
    }),

    http.patch('/api/user/me', async ({ request }) => {
      const updates = await request.json();
      return HttpResponse.json({ ...defaultUser, ...updates });
    }),
  ];
}

// Default export for the global handler array
export const userHandlers = createUserHandlers();
```

Use the factory in tests that need specific user states:

```ts
import { server } from '../test/mocks/server';
import { createUserHandlers } from '../test/mocks/handlers/users';

test('shows admin panel for admin users', async () => {
  server.use(...createUserHandlers({ role: 'admin' }));

  // render, assert admin panel is visible
});

test('hides admin panel for regular users', async () => {
  server.use(...createUserHandlers({ role: 'user' }));

  // render, assert admin panel is not visible
});
```

### Handler Composition for Multi-Scenario Tests

Combine factory patterns to set up complex test scenarios:

```ts
import { createUserHandlers } from '../test/mocks/handlers/users';
import { createProductHandlers } from '../test/mocks/handlers/products';

test('admin can edit product prices', async () => {
  server.use(
    ...createUserHandlers({ role: 'admin' }),
    ...createProductHandlers({
      products: [{ id: '1', name: 'Widget', price: 9.99, editable: true }],
    }),
  );

  // render, edit price, assert update request was sent
});
```

---

## Further Reading

- [MSW v2 docs — Integrations](https://mswjs.io/docs/integrations)
- [MSW v2 docs — Node.js integration](https://mswjs.io/docs/integrations/node)
- [MSW v2 docs — Browser integration](https://mswjs.io/docs/integrations/browser)
- [Playwright docs — Network mocking](https://playwright.dev/docs/mock)
- [Next.js docs — Testing](https://nextjs.org/docs/testing)
