---
sidebar_position: 1
title: What to Test Where
---

# What to Test Where

A decision framework for choosing between Jest, Playwright, and MSW. Knowing where each tool shines prevents duplicated effort, keeps your suite fast, and maximizes confidence per test dollar.

---

## 1. The Testing Trophy

Kent C. Dodds popularized the "testing trophy" as an alternative to the traditional testing pyramid. The trophy emphasizes integration tests as the highest-value layer.

```
        ┌─────────────┐
        │     E2E     │  Few, slow, high confidence
        ├─────────────┤
        │             │
        │ Integration │  Many, moderate speed, highest ROI
        │             │
        ├─────────────┤
        │    Unit     │  Some, fast, narrow scope
        ├─────────────┤
        │   Static    │  TypeScript, ESLint — catches typos and type errors
        └─────────────┘
```

**Static analysis** (TypeScript, ESLint) forms the base. It catches entire categories of bugs for free during development. **Unit tests** verify isolated logic. **Integration tests** are the sweet spot: they test components with their real children, hooks, and context, giving high confidence that features work as users experience them. **E2E tests** sit at the top, reserved for critical user flows that span multiple pages or require a real browser.

The key insight: integration tests (Jest + React Testing Library + MSW) give you the most confidence per millisecond of test runtime.

---

## 2. Jest's Sweet Spot

Jest (paired with React Testing Library) excels at testing things that do not require a real browser.

### Best For

- **Component rendering and interaction**: Does this component render the right content? When I click this button, does the correct handler fire?
- **Custom hooks**: Does `useDebounce` return the debounced value after the specified delay?
- **Utility functions**: Does `formatCurrency(1234.5)` return `"$1,234.50"`?
- **State management logic**: Does the reducer produce the correct next state for a given action?
- **Form validation**: Does the validation schema reject invalid emails?
- **Conditional rendering**: Does the error banner appear when the API returns an error (mocked with MSW)?

### Example

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("disables submit button when email is empty", async () => {
  render(<LoginForm onSubmit={jest.fn()} />);

  const submitButton = screen.getByRole("button", { name: /sign in/i });
  expect(submitButton).toBeDisabled();

  await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "password123");

  expect(submitButton).toBeEnabled();
});
```

### Why Jest for This

- Executes in milliseconds, not seconds
- No browser startup, no network, no server
- Instant feedback during development with `--watch`
- Tests run in jsdom, which is fast but does not support layout, navigation, or real browser APIs

:::tip
When choosing between Jest and Playwright for a given test, ask: "Does this test need a real browser?" If the answer is no, Jest is almost always the better choice.
:::

---

## 3. Playwright's Sweet Spot

Playwright runs a real browser. Use it for things that only a real browser can verify.

### Best For

- **Multi-page user flows**: Sign up, verify email, log in, complete onboarding
- **Client-side navigation**: Click a link, verify the URL changed, verify the new page rendered
- **Cross-browser behavior**: Verify the feature works in Chrome, Firefox, and Safari
- **Visual correctness**: Screenshot comparisons catch CSS regressions that no unit test can detect
- **Accessibility audits**: `@axe-core/playwright` scans the fully-rendered DOM in a real browser
- **Third-party integrations**: OAuth flows, payment forms in iframes, embedded widgets
- **Performance-sensitive flows**: Verify that a page loads within an acceptable time with real network conditions

### Example

```ts
import { test, expect } from "@playwright/test";

test("user can complete the checkout flow", async ({ page }) => {
  await page.goto("/products");
  await page
    .getByRole("button", { name: /add to cart/i })
    .first()
    .click();
  await page.getByRole("link", { name: /cart/i }).click();

  await expect(page).toHaveURL("/cart");
  await expect(page.getByText(/1 item/i)).toBeVisible();

  await page.getByRole("button", { name: /checkout/i }).click();
  await expect(page).toHaveURL("/checkout");

  await page.getByLabel(/card number/i).fill("4242424242424242");
  await page.getByLabel(/expiry/i).fill("12/28");
  await page.getByLabel(/cvc/i).fill("123");
  await page.getByRole("button", { name: /pay/i }).click();

  await expect(page.getByText(/order confirmed/i)).toBeVisible();
});
```

### Why Playwright for This

- Tests real browser rendering, layout, and navigation
- Catches issues that jsdom cannot: CSS bugs, hydration problems, viewport-specific behavior
- Cross-browser matrix testing is trivial to configure
- Built-in trace viewer, screenshots, and video recording for debugging

---

## 4. MSW's Role

MSW (Mock Service Worker) bridges the gap between unit/integration tests and E2E tests by providing consistent API mocking across both layers.

### In Jest (Node)

MSW intercepts `fetch` and `XMLHttpRequest` calls at the Node level. Your components make real fetch calls, and MSW responds with your defined handlers. No need to mock `fetch` directly.

```ts
// test/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({ id: 1, name: "Alice", role: "admin" });
  }),
  http.get("/api/notifications", () => {
    return HttpResponse.json([{ id: 1, message: "Welcome!", read: false }]);
  }),
];
```

```ts
// test/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

```ts
// jest.setup.ts
import { server } from "./test/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### In Playwright (Browser)

MSW can run as a Service Worker in the browser, or you can use `page.route()` for simpler cases. See the [E2E with Mocked APIs](../playwright/playwright-msw.md) guide for details.

### The Value of Shared Handlers

When Jest tests and Playwright tests use the same MSW handlers, you get a single source of truth for your API mocks. If the API contract changes, you update one set of handlers, and both test layers reflect the change.

:::tip
Start with MSW in Jest. Only add MSW to Playwright if you find yourself duplicating handler logic across `page.route()` calls. For most teams, `page.route()` is sufficient for Playwright mocks.
:::

---

## 5. Decision Framework

Use this table as a quick reference when deciding where to write a test.

| What You Are Testing                             | Tool                         | Why                                                |
| ------------------------------------------------ | ---------------------------- | -------------------------------------------------- |
| Pure function (formatter, validator, reducer)    | Jest                         | Fast, isolated, no DOM needed                      |
| Custom React hook                                | Jest + `renderHook`          | Tests hook logic without a component               |
| Component renders correct content                | Jest + RTL                   | Fast, tests component in isolation                 |
| Component + API interaction                      | Jest + RTL + MSW             | Tests component with realistic API responses       |
| Form validation rules                            | Jest                         | Pure logic, millisecond execution                  |
| Full form submit flow (UI + API + success state) | Jest + RTL + MSW             | Integration test covers the full component         |
| Multi-page user flow (sign up, onboarding)       | Playwright                   | Requires real navigation and browser state         |
| Visual appearance / CSS regressions              | Playwright screenshots       | Only a real browser renders CSS accurately         |
| Accessibility compliance                         | Playwright + axe-core        | Full DOM in a real browser gives accurate results  |
| Cross-browser compatibility                      | Playwright                   | Can run the same test in Chromium, Firefox, WebKit |
| OAuth / third-party login flow                   | Playwright                   | Requires real browser redirects and cookies        |
| API contract correctness                         | MSW + Jest or contract tests | Verify your mocks match the real API               |

### Flowchart

```
Does the test need a real browser?
├── YES
│   ├── Does it span multiple pages? ──→ Playwright E2E
│   ├── Is it a visual check? ──→ Playwright screenshot
│   └── Is it an a11y scan? ──→ Playwright + axe-core
│
└── NO
    ├── Is it pure logic (no React)? ──→ Jest unit test
    ├── Does it involve API calls? ──→ Jest + RTL + MSW
    └── Is it a component? ──→ Jest + RTL (integration)
```

---

## 6. Example: Login Flow

A login feature touches multiple layers. Here is how you would distribute tests across tools.

### Unit Test: Form Validation (Jest)

```ts
import { validateLoginForm } from "./validation";

describe("validateLoginForm", () => {
  test("rejects empty email", () => {
    const result = validateLoginForm({ email: "", password: "abc123" });
    expect(result.email).toBe("Email is required");
  });

  test("rejects invalid email format", () => {
    const result = validateLoginForm({
      email: "not-an-email",
      password: "abc123",
    });
    expect(result.email).toBe("Invalid email address");
  });

  test("rejects short password", () => {
    const result = validateLoginForm({
      email: "user@example.com",
      password: "12",
    });
    expect(result.password).toBe("Password must be at least 6 characters");
  });

  test("returns no errors for valid input", () => {
    const result = validateLoginForm({
      email: "user@example.com",
      password: "abc123",
    });
    expect(result).toEqual({});
  });
});
```

**Cost**: ~5ms per test. **Confidence**: Validation logic is correct.

### Integration Test: Form + API (Jest + RTL + MSW)

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../test/mocks/server";
import { http, HttpResponse } from "msw";
import { LoginPage } from "./LoginPage";

test("shows success message after valid login", async () => {
  render(<LoginPage />);

  await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "password123");
  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/welcome back/i)).toBeVisible();
  });
});

test("shows error when credentials are invalid", async () => {
  server.use(
    http.post("/api/auth/login", () => {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }),
  );

  render(<LoginPage />);

  await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/invalid credentials/i)).toBeVisible();
  });
});
```

**Cost**: ~50-200ms per test. **Confidence**: Form renders, validation fires, API is called, success and error states display correctly.

### E2E Test: Full Login Flow (Playwright)

```ts
import { test, expect } from "@playwright/test";

test("user can log in and reach the dashboard", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("testuser@example.com");
  await page.getByLabel(/password/i).fill("securepassword");
  await page.getByRole("button", { name: /sign in/i }).click();

  // Verify redirect to dashboard
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});

test("shows error for invalid credentials", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("testuser@example.com");
  await page.getByLabel(/password/i).fill("wrongpassword");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  await expect(page).toHaveURL("/login");
});
```

**Cost**: ~2-5 seconds per test. **Confidence**: The entire login flow works end-to-end in a real browser, including navigation, cookies, and server-side session management.

:::tip
Notice how each layer tests different things. The Jest unit test does not render any component. The Jest integration test does not navigate between pages. The Playwright test does not test individual validation rules. Each layer adds confidence without duplicating the work of another layer.
:::

---

## 7. Cost/Speed Tradeoffs

| Layer       | Tool                | Typical Speed        | What It Catches                                   | What It Misses                          |
| ----------- | ------------------- | -------------------- | ------------------------------------------------- | --------------------------------------- |
| Static      | TypeScript + ESLint | Instant (during dev) | Type errors, common mistakes                      | Logic bugs, runtime behavior            |
| Unit        | Jest                | 1-10ms per test      | Logic errors in isolated functions                | Integration issues, UI rendering        |
| Integration | Jest + RTL + MSW    | 50-500ms per test    | Component behavior, API interaction, state        | Real browser rendering, navigation, CSS |
| E2E         | Playwright          | 2-10s per test       | Full user flows, visual bugs, a11y, cross-browser | Expensive for exhaustive coverage       |

### When the Extra Cost Is Worth It

**Upgrade from Jest to Playwright when:**

- The bug you are protecting against can only occur in a real browser (CSS layout, hydration, browser API)
- The flow spans multiple pages with real navigation
- You need cross-browser verification
- You need visual regression protection

**Stay with Jest when:**

- The test exercises a single component or function
- You can mock the API with MSW and still have high confidence
- Speed matters (you want sub-second feedback in watch mode)
- The test does not depend on browser-specific behavior

### The Math

A typical project might have:

- 200 Jest tests running in 15 seconds total
- 30 Playwright tests running in 3 minutes total

Both suites might catch a similar number of regressions per quarter. But the Jest suite gives you feedback in seconds during development, while Playwright gives you confidence that everything works together in a real browser. You need both, but you should lean toward Jest for volume and Playwright for critical paths.

---

## 8. Anti-patterns

### Duplicating Tests Across Layers

:::caution
If your Jest integration test already verifies that submitting invalid form data shows an error message, you do not need a Playwright test that does the same thing. The Playwright test should verify the full flow (navigate to page, fill form, submit, get redirected) -- not re-test the validation logic.
:::

**Problem**: The same assertion appears in a Jest test and a Playwright test.

```ts
// Jest test
test('shows error for empty email', async () => {
  render(<LoginForm />);
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByText(/email is required/i)).toBeVisible();
});

// Playwright test -- this duplicates the Jest test
test('shows error for empty email', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByText(/email is required/i)).toBeVisible();
});
```

**Fix**: Keep the validation error test in Jest. The Playwright test should cover the happy path and maybe one critical error scenario (like invalid credentials from the server).

### E2E Tests for Component Internals

:::caution
Do not use Playwright to test things like "when I click the dropdown, the third item has the correct aria attribute." That is a component-level concern that belongs in a Jest + RTL test.
:::

**Problem**: Playwright tests that assert on internal component details.

```ts
// Anti-pattern: testing component internals in E2E
test("dropdown has correct aria attributes", async ({ page }) => {
  await page.goto("/settings");
  await page.getByRole("combobox").click();
  const option = page.getByRole("option").nth(2);
  await expect(option).toHaveAttribute("aria-selected", "true");
});
```

**Fix**: Test this in Jest with React Testing Library, where you have direct access to the component and its props. Use Playwright to test that the settings page works as a whole.

### Mocking Everything in E2E

:::caution
If every API call in your Playwright test is mocked, you are not testing end-to-end -- you are testing your frontend with a fake backend. That is what Jest + MSW already does, faster.
:::

**Problem**: A Playwright test that mocks every single API call.

**Fix**: Playwright tests should hit a real (or realistically staged) backend whenever possible. Mock selectively: third-party APIs you cannot control, error scenarios you cannot reproduce, or specific edge cases. If you find yourself mocking more than two or three routes in a Playwright test, consider whether the test belongs in Jest + MSW instead.

### Testing Implementation Details

**Problem**: Tests that assert on internal state, hook return values, or DOM structure rather than user-visible behavior.

```tsx
// Anti-pattern
test("sets isLoading to true", async () => {
  const { result } = renderHook(() => useData());
  expect(result.current.isLoading).toBe(true);
});
```

**Fix**: Test what the user sees.

```tsx
// Better
test("shows loading spinner while data loads", async () => {
  render(<DataDisplay />);
  expect(screen.getByRole("progressbar")).toBeVisible();
});
```

:::tip
The best test suite is one where every test failure points to a real bug that would affect users. If a test fails and you think "that is not actually a problem," the test is testing the wrong thing or at the wrong layer.
:::
