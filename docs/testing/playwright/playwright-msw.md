---
sidebar_position: 4
title: E2E with Mocked APIs
---

# E2E with Mocked APIs

Controlling API responses in Playwright tests using `page.route()` and, for complex scenarios, MSW (Mock Service Worker).

---

## 1. Why Mock in E2E

End-to-end tests are supposed to test the real application. So why mock the API layer?

- **Flaky external dependencies**: Third-party APIs go down, rate-limit, or return inconsistent data. A test that depends on Stripe's sandbox or a weather API is a test that will eventually fail for reasons unrelated to your code.
- **Speed**: Network calls to real backends add latency. Mocked responses resolve instantly, keeping your suite fast.
- **Edge case testing**: It is difficult to make a real API return a 500 error, a malformed JSON body, or a 30-second timeout on demand. Mocks let you simulate these scenarios reliably.
- **Data isolation**: Real APIs often share state. If one test creates a user, another test might see it. Mocks give each test a clean, predictable environment.
- **Offline CI**: Some CI runners have restricted or no internet access. Mocking removes that dependency entirely.

:::info
Mocking does not replace integration tests against your real backend. Use mocked E2E tests for UI behavior verification. Use a separate integration or contract test suite to verify that your frontend and backend agree on API shapes.
:::

---

## 2. `page.route()` Basics

Playwright provides `page.route()` to intercept requests made by the browser. This is the simplest and most commonly used approach for mocking in E2E tests.

### Glob Pattern Matching

```ts
import { test, expect } from '@playwright/test';

test('displays a list of users from the API', async ({ page }) => {
  await page.route('**/api/users', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]),
    })
  );

  await page.goto('/users');

  await expect(page.getByText('Alice')).toBeVisible();
  await expect(page.getByText('Bob')).toBeVisible();
});
```

### Regex Matching

```ts
// Match any request to /api/users/123 or /api/users/456
await page.route(/\/api\/users\/\d+/, (route) =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ id: 123, name: 'Alice', role: 'admin' }),
  })
);
```

### Response Helpers

```ts
// Fulfill with a JSON file
await page.route('**/api/products', (route) =>
  route.fulfill({ path: './e2e/fixtures/products.json' })
);

// Abort the request entirely (simulates network failure)
await page.route('**/api/analytics', (route) => route.abort());

// Continue the request unmodified (useful as a default in conditional logic)
await page.route('**/api/**', (route) => route.continue());
```

:::tip
Use `**` in glob patterns to match any path segment. `**/api/users` matches `http://localhost:3000/api/users` and `https://prod.example.com/api/users`.
:::

---

## 3. Intercepting and Modifying

Sometimes you want the request to hit the real server but modify the response before the browser receives it. This is useful for augmenting real data with test-specific overrides.

### Passthrough with Modification

```ts
test('augments real API data with a test flag', async ({ page }) => {
  await page.route('**/api/user/profile', async (route) => {
    // Fetch the real response
    const response = await route.fetch();
    const json = await response.json();

    // Modify it
    json.featureFlags = { ...json.featureFlags, newDashboard: true };

    // Fulfill with the modified response
    await route.fulfill({
      response,
      body: JSON.stringify(json),
    });
  });

  await page.goto('/dashboard');
  await expect(page.getByTestId('new-dashboard-banner')).toBeVisible();
});
```

### Conditional Mocking

```ts
test('mocks only POST requests, lets GETs through', async ({ page }) => {
  await page.route('**/api/orders', (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'order-999', status: 'created' }),
      });
    }
    // Let GET requests pass through to the real server
    return route.continue();
  });

  await page.goto('/orders');
  // GET /api/orders hits the real server and displays real data
  // POST /api/orders returns the mocked response
});
```

### Inspecting Request Bodies

```ts
test('sends correct data when creating a new item', async ({ page }) => {
  let capturedBody: Record<string, unknown> | null = null;

  await page.route('**/api/items', (route) => {
    if (route.request().method() === 'POST') {
      capturedBody = route.request().postDataJSON();
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'item-1', ...capturedBody }),
      });
    }
    return route.continue();
  });

  await page.goto('/items/new');
  await page.getByLabel(/title/i).fill('New Item');
  await page.getByLabel(/description/i).fill('A test item');
  await page.getByRole('button', { name: /create/i }).click();

  expect(capturedBody).toEqual({
    title: 'New Item',
    description: 'A test item',
  });
});
```

---

## 4. Error States

Mocking error responses is one of the highest-value uses of `page.route()`. These scenarios are nearly impossible to test reliably against a real API.

### Simulating a 500 Server Error

```ts
test('shows error banner when the API returns 500', async ({ page }) => {
  await page.route('**/api/dashboard', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    })
  );

  await page.goto('/dashboard');
  await expect(page.getByRole('alert')).toContainText(/something went wrong/i);
});
```

### Simulating a Slow Response

```ts
test('shows loading spinner during slow API response', async ({ page }) => {
  await page.route('**/api/search', async (route) => {
    // Delay the response by 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ results: [] }),
    });
  });

  await page.goto('/search?q=test');

  // Spinner should be visible while waiting
  await expect(page.getByRole('progressbar')).toBeVisible();

  // After the response arrives, spinner disappears and results show
  await expect(page.getByText(/no results/i)).toBeVisible({ timeout: 10_000 });
});
```

### Simulating a Network Timeout

```ts
test('handles network timeout gracefully', async ({ page }) => {
  await page.route('**/api/data', (route) => route.abort('timedout'));

  await page.goto('/data');
  await expect(page.getByText(/unable to connect/i)).toBeVisible();
});
```

### Simulating Specific HTTP Errors

```ts
test('shows "not found" for 404 responses', async ({ page }) => {
  await page.route('**/api/users/999', (route) =>
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'User not found' }),
    })
  );

  await page.goto('/users/999');
  await expect(page.getByText(/user not found/i)).toBeVisible();
});

test('redirects to login on 401', async ({ page }) => {
  await page.route('**/api/**', (route) =>
    route.fulfill({ status: 401, body: 'Unauthorized' })
  );

  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});
```

:::caution
When simulating slow responses, increase the test timeout or the assertion timeout. The default Playwright assertion timeout is 5 seconds, which is not enough if your mock delays for 5 seconds.
:::

---

## 5. MSW in Playwright

[MSW (Mock Service Worker)](https://mswjs.io/) is a request interception library that uses a Service Worker in the browser and a server-based interceptor in Node. While `page.route()` covers most mocking needs in Playwright, MSW can be useful in specific scenarios.

### When MSW Is Worth It

- You already have an extensive MSW handler library from your Jest/Vitest tests and want to reuse those exact handlers in E2E
- You need request interception that persists across page navigations without re-registering routes
- You want the same mock definitions to work in both unit tests and E2E tests

### When `page.route()` Is Better

- You are writing Playwright-only mocks (no need to share with Jest)
- You want simple, per-test mocks without additional infrastructure
- You need to intercept requests at the network level (before the Service Worker)

### The `setupWorker` Approach

To use MSW in the browser during Playwright tests, you need to:

1. Initialize the MSW service worker in your application
2. Register handlers from your shared handler library
3. Control activation from your test setup

```ts
// src/mocks/browser.ts (your app code)
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

```ts
// src/mocks/handlers.ts (shared with Jest tests)
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }),
];
```

```ts
// Conditionally start MSW in your app entry point
// Only runs when NEXT_PUBLIC_ENABLE_MOCKS is set
async function enableMocking() {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCKS !== 'true') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  // render your app
});
```

```ts
// playwright.config.ts
export default defineConfig({
  webServer: {
    command: 'NEXT_PUBLIC_ENABLE_MOCKS=true npm run dev',
    url: 'http://localhost:3000',
  },
});
```

:::info
The MSW approach adds complexity (service worker registration, conditional app code, build-time env vars). For most teams, `page.route()` is the better default. Reserve MSW for cases where handler reuse across test layers genuinely saves significant duplication.
:::

---

## 6. Next.js SSR Caveat

This is the single most important thing to understand about API mocking in Playwright with Next.js.

### The Problem

`page.route()` intercepts requests made by the **browser**. It does not intercept requests made by the **Next.js server** during server-side rendering (SSR), server components, or API route handlers.

```
Browser request:  page.route() CAN intercept
   |
   v
[Browser] ---fetch('/api/users')---> [Server]  <-- intercepted by page.route()

Server request:   page.route() CANNOT intercept
   |
   v
[Next.js Server] ---fetch('https://api.example.com/users')---> [External API]
                     ^^ this happens on the server, invisible to page.route()
```

This means if your Next.js page fetches data in a Server Component, `getServerSideProps`, or a Route Handler that is called during SSR, `page.route()` will not see those requests.

### Workarounds

**1. Use an environment variable to point at a mock server:**

Run a lightweight mock server (like MSW's `setupServer` or a simple Express app) alongside your Next.js app, and configure the server-side fetch URLs via environment variables.

```ts
// playwright.config.ts
export default defineConfig({
  webServer: [
    {
      command: 'node e2e/mock-server.js',
      url: 'http://localhost:4000/health',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run build && npm run start',
      url: 'http://localhost:3000',
      env: {
        API_BASE_URL: 'http://localhost:4000',
      },
      reuseExistingServer: !process.env.CI,
    },
  ],
});
```

**2. Mock at the data layer in test mode:**

Create a test-mode data provider that returns fixture data when a test environment variable is set.

```ts
// lib/data.ts
export async function getUsers() {
  if (process.env.USE_TEST_FIXTURES === 'true') {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
  }
  const res = await fetch(`${process.env.API_BASE_URL}/users`);
  return res.json();
}
```

**3. Use `page.route()` for client-side fetches only:**

If your page does an initial SSR fetch and then subsequent client-side fetches (e.g., pagination, search), you can mock the client-side fetches with `page.route()` while accepting that the SSR data comes from the real (or mock) server.

:::caution
This is the most common source of confusion when testing Next.js with Playwright. If your mock is set up with `page.route()` but the data still shows real API responses, the fetch is almost certainly happening server-side. Check whether the component is a Server Component or uses `getServerSideProps`.
:::

:::info
The MSW Node server approach (workaround 1) is the most flexible solution. It gives you full control over server-side responses using the same handler syntax you already know from MSW. The trade-off is the operational complexity of running a second server process during tests.
:::
