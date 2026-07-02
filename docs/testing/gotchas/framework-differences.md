---
sidebar_position: 1
title: Framework Differences
---

# Framework Testing Differences

Testing a React component in a Vite SPA is not the same as testing one inside Next.js, and neither of those resemble testing an Astro page. The framework dictates how routing works, where data is fetched, and whether your component even runs in the browser at all. This page catalogs those differences so you can reach for the right pattern immediately instead of debugging for an hour.

The tables below are meant to be scanned quickly. Each row answers "how do I test **this concern** in **this framework**?" with a concrete technique and short code snippet.

---

## Navigation Testing

How you test routing depends entirely on who owns the router.

| Framework / Router | Technique | Key Idea |
|--------------------|-----------|----------|
| react-router v6 | Wrap in `MemoryRouter`, assert on location | You control the history in-memory |
| Next.js Pages Router | Mock `next/router` via `useRouter` | Assert `router.push` was called |
| Next.js App Router | Mock `next/navigation` | Different module path from Pages Router |
| Astro | Assert `href` attributes or use Playwright | No client-side router to mock |

### react-router v6

Wrap the component under test in a `MemoryRouter` with an initial route and assert that navigation moves to the expected path.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './NavBar';

test('navigates to /about when link is clicked', async () => {
  const user = userEvent.setup();
  let currentPath = '/';

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route
          path="/about"
          element={<p>About page</p>}
        />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(screen.getByRole('link', { name: /about/i }));
  expect(screen.getByText('About page')).toBeInTheDocument();
});
```

### Next.js Pages Router

Mock the `useRouter` hook from `next/router` and verify that `push` is called with the expected path.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavBar } from './NavBar';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

test('calls router.push on click', async () => {
  const user = userEvent.setup();
  render(<NavBar />);

  await user.click(screen.getByRole('button', { name: /dashboard/i }));
  expect(mockPush).toHaveBeenCalledWith('/dashboard');
});
```

:::caution[Next.js Gotcha]
If you migrate from Pages Router to App Router, every `next/router` mock must change to `next/navigation`. The hook names also change: `useRouter` stays the same but `usePathname`, `useSearchParams`, and `useParams` are separate hooks in App Router.
:::

### Next.js App Router

Mock `next/navigation` instead. The API surface is split across multiple hooks.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavBar } from './NavBar';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

test('navigates to /settings via App Router', async () => {
  const user = userEvent.setup();
  render(<NavBar />);

  await user.click(screen.getByRole('link', { name: /settings/i }));
  expect(mockPush).toHaveBeenCalledWith('/settings');
});
```

### Astro

Astro renders pages at build time with zero client-side router. Test link destinations by asserting `href` attributes in unit tests, or validate real navigation with Playwright.

```tsx
// Unit test: just check the href
import { render, screen } from '@testing-library/react';
import { NavLink } from './NavLink'; // an Astro-compatible component

test('renders correct href', () => {
  render(<NavLink to="/blog" label="Blog" />);
  expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute(
    'href',
    '/blog',
  );
});
```

```ts
// E2E test: verify real navigation
import { test, expect } from '@playwright/test';

test('blog link navigates to /blog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /blog/i }).click();
  await expect(page).toHaveURL('/blog');
});
```

:::info[Framework Note]
Astro `.astro` components cannot be rendered in jsdom. If you need unit-level tests, extract logic into framework components (React, Svelte, Vue) that Astro islands can consume, and test those with RTL. For full-page tests, use Playwright.
:::

---

## Data Fetching Testing

Where data fetching lives determines whether you mock at the network level, call the function directly, or wrap in a provider.

| Pattern | Technique | Notes |
|---------|-----------|-------|
| Vanilla React (`fetch` in `useEffect`) | Mock `fetch` or use MSW | MSW preferred -- intercepts at the network level |
| Next.js `getServerSideProps` / `getStaticProps` | Import and call the function directly | It is a plain async function; no component render needed |
| Next.js App Router Server Components | Test the data function in isolation | Server Components are async functions that cannot render in jsdom |
| SWR / React Query | Wrap in the cache provider + use MSW | Provider prevents cache leaking between tests |

### Vanilla React with MSW

```tsx
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { UserProfile } from './UserProfile';

const server = setupServer(
  http.get('/api/user/1', () =>
    HttpResponse.json({ name: 'Ada Lovelace', id: 1 }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders fetched user name', async () => {
  render(<UserProfile userId={1} />);
  expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
});
```

### Next.js `getServerSideProps`

Since `getServerSideProps` is an exported async function, you can import it and test it without rendering any component.

```ts
import { getServerSideProps } from '../pages/dashboard';

// Mock the data layer, not the framework
jest.mock('../lib/db', () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'Ada' }),
}));

test('returns user as props', async () => {
  const context = {
    params: { id: '1' },
    req: {} as any,
    res: {} as any,
    resolvedUrl: '/dashboard',
    query: { id: '1' },
  };

  const result = await getServerSideProps(context);
  expect(result).toEqual({
    props: { user: { id: 1, name: 'Ada' } },
  });
});
```

:::tip[Best Practice]
Test `getServerSideProps` and `getStaticProps` as plain functions. Do not try to render the entire page and assert on network calls -- that conflates data fetching tests with component rendering tests.
:::

### Next.js App Router Server Components

React Server Components are `async` functions that run on the server. They cannot be rendered inside jsdom because jsdom has no server runtime. Extract the data-fetching logic and test it independently.

```ts
// lib/getUser.ts
export async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}
```

```ts
// lib/getUser.test.ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getUser } from './getUser';

const server = setupServer(
  http.get('https://api.example.com/users/1', () =>
    HttpResponse.json({ id: '1', name: 'Ada' }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('returns user data', async () => {
  const user = await getUser('1');
  expect(user).toEqual({ id: '1', name: 'Ada' });
});

test('throws on non-200 response', async () => {
  server.use(
    http.get('https://api.example.com/users/1', () =>
      new HttpResponse(null, { status: 404 }),
    ),
  );
  await expect(getUser('1')).rejects.toThrow('Failed to fetch user');
});
```

:::caution[Next.js Gotcha]
Do not attempt to call `render(<ServerComponent />)` in a Jest/jsdom test. It will either hang or throw because `async` function components are not supported by React's client-side renderer in a test environment. Test the data function, then separately test any client components that consume its output as props.
:::

### SWR / React Query

Wrap the component in a fresh provider per test to avoid shared cache. Combine with MSW for network mocking.

```tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { UserProfile } from './UserProfile';

const server = setupServer(
  http.get('/api/user', () =>
    HttpResponse.json({ name: 'Ada' }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
  );
}

test('renders user from React Query', async () => {
  renderWithClient(<UserProfile />);
  expect(await screen.findByText('Ada')).toBeInTheDocument();
});
```

:::tip[Best Practice]
Always create a **new** `QueryClient` (or SWR `SWRConfig` with `provider: () => new Map()`) in each test. Reusing a single client causes cache to leak between tests, leading to false passes and ordering-dependent failures.
:::

---

## Component Rendering

Not all components render the same way, and "component" means something different depending on the framework.

| Component Type | How to Test | Tool |
|----------------|------------|------|
| Client Components (React, Vue, Svelte) | Standard RTL `render()` | Jest + Testing Library |
| React Server Components (Next.js App Router) | Await the async function, assert on the return value | Jest (no RTL) |
| Astro `.astro` Components | Full-page E2E test | Playwright |
| Astro Islands (React/Vue inside Astro) | Standard RTL `render()` for the island component | Jest + Testing Library |

### Client Components

The standard path. Nothing unusual here.

```tsx
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

test('renders the greeting', () => {
  render(<Greeting name="Ada" />);
  expect(screen.getByText('Hello, Ada!')).toBeInTheDocument();
});
```

### Server Components (Conceptual Test)

Since a Server Component is an `async` function that returns JSX, you can call it and inspect the result -- but you cannot use RTL's `render` in jsdom.

```tsx
import { UserCard } from './UserCard'; // async Server Component

// This is a simplified conceptual test.
// In practice, test the data function and the client sub-components separately.
test('returns expected structure', async () => {
  const result = await UserCard({ userId: '1' });
  // `result` is a React element tree -- useful for snapshot or structural checks
  expect(result).toBeTruthy();
});
```

:::info[Framework Note]
The React team is actively working on improved Server Component testing primitives. For now, the pragmatic approach is: test data functions as unit tests, test client sub-components with RTL, and test the full assembled page with Playwright.
:::

### Astro Components

Astro `.astro` files compile to HTML at build time and have no JavaScript runtime representation that jsdom can execute. Use Playwright.

```ts
import { test, expect } from '@playwright/test';

test('hero section renders heading and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Welcome to the site',
  );
  await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
});
```

---

## Environment Differences

The biggest source of subtle bugs is forgetting which environment your test runs in.

| | Jest (jsdom) | Playwright (real browser) |
|---|---|---|
| **DOM** | Simulated via jsdom | Real browser DOM (Chromium, Firefox, WebKit) |
| **`fetch`** | Not available natively (needs polyfill or `jest-environment-jsdom` with `--experimental-vm-modules`) | Native `fetch`, same as production |
| **CSS** | Not parsed or rendered; classes exist as strings | Fully rendered; `toHaveCSS()` assertions work |
| **Layout** | No layout engine; `getBoundingClientRect()` returns zeros | Real layout; pixel-level assertions possible |
| **Navigation** | Simulated via mocks or `MemoryRouter` | Real navigation with history, URL bar, redirects |
| **`localStorage`** | Available (jsdom implements it) | Available (real browser) |
| **Web APIs** | Partial (no `IntersectionObserver`, `ResizeObserver`, etc. without polyfills) | Full browser API surface |
| **Speed** | Fast (milliseconds per test) | Slower (hundreds of milliseconds to seconds) |
| **Parallelism** | Process-level via Jest workers | Browser-context-level via Playwright workers |

:::tip[Best Practice]
Use Jest for logic and interaction tests where speed matters. Use Playwright when you need to verify real browser behavior: CSS rendering, viewport-dependent logic, navigation flows, or anything involving APIs that jsdom does not implement.
:::

---

## Common Gotchas Collection

### `act()` Warnings

The `act()` warning means React state updated outside of a test-controlled boundary. It is React telling you that something asynchronous happened after your test thought it was done.

**When it matters:** If your test passes but logs `act()` warnings, it usually means a state update fires after the test ends. This can mask real bugs and cause flaky failures in CI.

**When to use `waitFor` instead of wrapping in `act()`:**

```tsx
// BAD -- manually wrapping in act() is almost always the wrong fix
import { act } from 'react';

await act(async () => {
  render(<UserProfile />);
});

// GOOD -- use findBy* queries (they wait internally)
render(<UserProfile />);
const name = await screen.findByText('Ada Lovelace');
expect(name).toBeInTheDocument();

// GOOD -- use waitFor when you need to assert on something that updates
render(<Counter />);
await userEvent.click(screen.getByRole('button', { name: /increment/i }));
await waitFor(() => {
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

:::tip[Best Practice]
If you see an `act()` warning, ask yourself: "Is there an async operation (fetch, timer, animation) that my test is not waiting for?" The answer is almost always yes. Use `findBy*` queries or `waitFor` to let RTL handle the waiting. Manually wrapping things in `act()` should be a last resort.
:::

### `userEvent.setup()` vs Inline Calls

`@testing-library/user-event` v14+ introduced `userEvent.setup()`. Always call it before `render` and use the returned object. The inline API (`userEvent.click(...)`) still works but does not set up the event system correctly for advanced interactions.

```tsx
// BAD -- inline calls miss keyboard state, pointer state, clipboard, etc.
import userEvent from '@testing-library/user-event';

test('types into input', async () => {
  render(<SearchBox />);
  await userEvent.type(screen.getByRole('textbox'), 'hello');
});

// GOOD -- setup returns an instance that tracks state across interactions
test('types into input', async () => {
  const user = userEvent.setup();
  render(<SearchBox />);
  await user.type(screen.getByRole('textbox'), 'hello');
  expect(screen.getByRole('textbox')).toHaveValue('hello');
});
```

:::info[Framework Note]
The `setup()` pattern matters most when your test involves multiple sequential interactions (type then click, keyboard shortcuts, clipboard paste). For a single click, you likely will not notice a difference, but adopting `setup()` everywhere avoids the inconsistency.
:::

### Testing Portals (Modals, Tooltips)

Portals render outside the component's parent DOM node, usually into `document.body` or a dedicated container. RTL queries search the entire `document` by default, so portal content is queryable without extra setup.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalTrigger } from './ModalTrigger';

test('modal content is visible after opening', async () => {
  const user = userEvent.setup();
  render(<ModalTrigger />);

  await user.click(screen.getByRole('button', { name: /open modal/i }));

  // Portal content is in the document, RTL finds it automatically
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText('Modal body content')).toBeVisible();
});

test('modal closes on Escape', async () => {
  const user = userEvent.setup();
  render(<ModalTrigger />);

  await user.click(screen.getByRole('button', { name: /open modal/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

:::caution[Next.js Gotcha]
If your portal mounts into a DOM node that does not exist during testing (e.g., `document.getElementById('modal-root')`), the test will throw or silently fail. Add the portal target to your test setup:

```ts
// jest.setup.ts or in a beforeEach
const portalRoot = document.createElement('div');
portalRoot.id = 'modal-root';
document.body.appendChild(portalRoot);
```
:::

### Jest Fake Timers and MSW Conflicts

Jest's fake timers replace `setTimeout`, `setInterval`, and related functions. MSW relies on real timers internally to manage request handlers. When both are active simultaneously, MSW requests hang forever because the timer callbacks never fire.

**The fix:** Use `shouldAdvanceTimers` with `userEvent.setup()`, and be strategic about when you enable fake timers.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Debouncer } from './Debouncer';

// If your component uses both debounced input AND network requests via MSW:
test('debounced search triggers after delay', async () => {
  jest.useFakeTimers();

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  render(<Debouncer />);

  await user.type(screen.getByRole('textbox'), 'search term');

  // Advance past the debounce delay
  jest.advanceTimersByTime(500);

  // If MSW is also active, you may need to flush real async work:
  await screen.findByText('Results for: search term');

  jest.useRealTimers();
});
```

:::caution[Next.js Gotcha]
When combining fake timers with MSW in a Next.js project, restore real timers in `afterEach` to prevent timer state from leaking into subsequent tests:

```ts
afterEach(() => {
  jest.useRealTimers();
});
```

If requests still hang, isolate the MSW-dependent test and do not use fake timers in it. Test the timer logic and the network logic separately.
:::

### `toBeInTheDocument()` Requires jest-dom

`toBeInTheDocument()` is not a built-in Jest matcher. It comes from `@testing-library/jest-dom`. If you see `TypeError: expect(...).toBeInTheDocument is not a function`, your setup file is missing.

```ts
// jest.setup.ts (or whatever your setupFilesAfterEach points to)
import '@testing-library/jest-dom';
```

```json
// jest.config.js or package.json
{
  "jest": {
    "setupFilesAfterSetup": ["<rootDir>/jest.setup.ts"]
  }
}
```

:::tip[Best Practice]
Add the import to a global setup file once rather than importing it in every test file. For Vitest, the equivalent is:

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
});

// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
```
:::

### CSS Modules Need `identity-obj-proxy`

When a component imports a CSS Module (`import styles from './Button.module.css'`), Jest cannot parse CSS. Without configuration, the import fails or returns an empty object, which means `styles.primary` resolves to `undefined` and your className-based queries break.

**The fix:** Use `identity-obj-proxy`, which returns the property name as the value (`styles.primary` becomes the string `"primary"`).

```js
// jest.config.js
module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

After this, `styles.primary` returns `"primary"` in tests, which is enough for assertions like:

```tsx
test('applies primary class', () => {
  render(<Button variant="primary" />);
  expect(screen.getByRole('button')).toHaveClass('primary');
});
```

:::info[Framework Note]
If you use Vitest, `identity-obj-proxy` is not needed. Vitest handles CSS Modules natively with its `css.modules` configuration. In Next.js projects using `next/jest`, CSS Module handling is preconfigured, so you generally do not need to set this up manually.
:::

### Next.js `next/image` Needs a Mock

`next/image` relies on Next.js internals (image optimization, loader configuration) that do not exist in a Jest environment. Without a mock, tests either throw or render a broken `<img>` tag.

```tsx
// __mocks__/next/image.tsx
const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} />;
};

export default MockImage;
```

Place this file at `__mocks__/next/image.tsx` relative to your project root. Jest automatically picks up the mock from the `__mocks__` directory.

Alternatively, configure it in `jest.config.js`:

```js
module.exports = {
  moduleNameMapper: {
    '^next/image$': '<rootDir>/__mocks__/next/image.tsx',
  },
};
```

:::caution[Next.js Gotcha]
If you use `next/jest` to create your Jest config, some of these mocks are handled automatically. Check the `next/jest` source or your resolved config before adding manual mocks -- duplicates can cause confusing "module not found" errors.
:::

### React 18 Concurrent Mode and `act()` Behavior

React 18 introduced concurrent rendering, which changes how state updates are batched. In React 17, only updates inside React event handlers were batched. In React 18, **all** updates are batched by default, including those inside `setTimeout`, promises, and native event handlers.

This affects tests in two ways:

1. **Fewer re-renders than expected.** If your test previously asserted on intermediate states during a sequence of updates, React 18 may batch them into a single render, causing the intermediate assertion to fail.

2. **More `act()` warnings.** Concurrent features like `startTransition` and `useDeferredValue` schedule work that React controls. Tests that do not properly wait for these updates will see `act()` warnings.

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchWithTransition } from './SearchWithTransition';

test('shows results after transition', async () => {
  const user = userEvent.setup();
  render(<SearchWithTransition />);

  await user.type(screen.getByRole('textbox'), 'react');

  // In React 18, the update may be deferred via startTransition.
  // Use waitFor to handle the async transition.
  await waitFor(() => {
    expect(screen.getByText('Results for: react')).toBeInTheDocument();
  });
});
```

:::tip[Best Practice]
When upgrading from React 17 to 18:

- Replace `ReactDOM.render` with `createRoot` in your test setup if you use a custom render function.
- Use `findBy*` and `waitFor` liberally -- they handle concurrent batching gracefully.
- If a test that passed in React 17 now shows `act()` warnings, it usually means you need to `await` an interaction or query that was previously synchronous.
- Run your test suite with `reactStrictMode: true` during CI to catch issues caused by double-invocation of effects in development mode.
:::

---

## Quick Decision Flowchart

When you sit down to write a test, ask these questions in order:

1. **Is it a pure function or utility?** Write a plain unit test. No framework concerns.
2. **Is it a client component?** Use RTL `render()` + queries + `userEvent`.
3. **Does it fetch data?** Add MSW (or mock the fetch layer). Wrap in the appropriate provider if using SWR or React Query.
4. **Does it use routing?** Mock the router (`MemoryRouter`, `next/router`, or `next/navigation`).
5. **Is it a Server Component?** Test the data function separately. Test client sub-components with RTL. Test the assembled page with Playwright.
6. **Is it an Astro `.astro` component?** Use Playwright E2E.
7. **Does it rely on CSS layout, viewport, or browser APIs?** Use Playwright.

When in doubt, test at the lowest level that gives you confidence, and escalate to E2E only when the unit/integration approach cannot cover the behavior.
