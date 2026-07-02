---
sidebar_position: 3
title: Playwright + Next.js
---

# Playwright + Next.js

End-to-end testing patterns for Next.js applications using Playwright. This guide covers project setup, common testing scenarios, and the framework-specific pitfalls you will encounter.

---

## 1. Setup

### Install Dependencies

```bash
npm install -D @playwright/test
npx playwright install
```

### `playwright.config.ts` with `webServer`

The `webServer` option tells Playwright to start your Next.js app before running tests and tear it down afterward. The configuration differs between development and production builds.

**Development build (fast iteration):**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

**Production build (CI-realistic):**

```ts
webServer: {
  command: 'npm run build && npm run start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
},
```

:::caution[Next.js Gotcha]
Dev mode (`next dev`) includes React Strict Mode double-renders and verbose hydration warnings. Tests that assert console output or count renders will behave differently than production. Always run your CI suite against `next build && next start`.
:::

:::tip[Best Practice]
Set `reuseExistingServer: !process.env.CI` so that local development reuses a running dev server (faster iteration), while CI always starts a clean server (deterministic results).
:::

---

## 2. Navigation Testing

### Basic Navigation with `page.goto()`

```ts
import { test, expect } from '@playwright/test';

test('navigates to the about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveURL('/about');
  await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();
});
```

### Waiting for Hydration

Next.js pages render server-side HTML first and then hydrate on the client. If you interact with elements before hydration completes, clicks may be swallowed or state may not update.

```ts
test('waits for hydration before interacting', async ({ page }) => {
  await page.goto('/dashboard');

  // Wait for Next.js hydration by checking for an interactive element
  // that only works after React has attached event handlers
  await page.waitForLoadState('networkidle');

  const button = page.getByRole('button', { name: /refresh/i });
  await expect(button).toBeEnabled();
  await button.click();

  await expect(page.getByText(/updated/i)).toBeVisible();
});
```

### Testing Dynamic Routes (`[slug]`)

```ts
test('renders a dynamic blog post page', async ({ page }) => {
  await page.goto('/blog/my-first-post');
  await expect(page).toHaveURL('/blog/my-first-post');
  await expect(page.getByRole('article')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /my first post/i })
  ).toBeVisible();
});

test('shows 404 for unknown slugs', async ({ page }) => {
  const response = await page.goto('/blog/this-does-not-exist');
  expect(response?.status()).toBe(404);
});
```

### Navigating via UI Elements

```ts
test('client-side navigation works via Link components', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /blog/i }).click();

  // Client-side navigation: no full page reload
  await expect(page).toHaveURL('/blog');
  await expect(page.getByRole('heading', { name: /blog/i })).toBeVisible();
});
```

:::tip[Best Practice]
Prefer testing navigation by clicking links in the UI rather than calling `page.goto()` directly. This exercises the actual user experience, including client-side routing and prefetching.
:::

---

## 3. Form Flows

### Filling and Submitting a Form

```ts
test('submits a contact form successfully', async ({ page }) => {
  await page.goto('/contact');

  await page.getByLabel(/name/i).fill('Jane Doe');
  await page.getByLabel(/email/i).fill('jane@example.com');
  await page.getByLabel(/message/i).fill('Hello, I have a question about your product.');

  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.getByText(/thank you/i)).toBeVisible();
});
```

### Asserting Validation Errors

```ts
test('shows validation errors for empty required fields', async ({ page }) => {
  await page.goto('/contact');

  // Submit without filling anything
  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.getByText(/name is required/i)).toBeVisible();
  await expect(page.getByText(/email is required/i)).toBeVisible();
});
```

### Asserting Server-Side Error States

```ts
test('displays server error when submission fails', async ({ page }) => {
  // Mock the API to return a 500
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    })
  );

  await page.goto('/contact');
  await page.getByLabel(/name/i).fill('Jane Doe');
  await page.getByLabel(/email/i).fill('jane@example.com');
  await page.getByLabel(/message/i).fill('Test message');
  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.getByText(/something went wrong/i)).toBeVisible();
});
```

:::tip[Best Practice]
Use `page.getByLabel()` for form fields instead of `page.locator('input[name="email"]')`. Label-based selectors verify that your form is accessible and are resilient to markup changes.
:::

---

## 4. Authentication

### The Storage State Pattern

Playwright can save browser state (cookies, localStorage) to a JSON file and reuse it across tests. This avoids logging in before every single test.

**Step 1: Create a `setup` project that logs in and saves state.**

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  projects: [
    // This project runs first and saves auth state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // These projects depend on setup and reuse its auth state
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
  ],
});
```

**Step 2: Write the setup test that performs login.**

```ts
// e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('testuser@example.com');
  await page.getByLabel(/password/i).fill('securepassword');
  await page.getByRole('button', { name: /sign in/i }).click();

  // Wait for redirect after successful login
  await page.waitForURL('/dashboard');
  await expect(page.getByText(/welcome/i)).toBeVisible();

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
```

**Step 3: All tests in dependent projects start already logged in.**

```ts
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('shows dashboard for authenticated user', async ({ page }) => {
  // No login step needed -- storageState is already loaded
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

:::tip[Best Practice]
Add `playwright/.auth/` to your `.gitignore`. Auth state files contain session tokens and should never be committed.
:::

### Testing Multiple Roles

```ts
// playwright.config.ts (partial)
projects: [
  { name: 'setup-admin', testMatch: /admin\.setup\.ts/ },
  { name: 'setup-user', testMatch: /user\.setup\.ts/ },
  {
    name: 'admin-tests',
    use: { storageState: 'playwright/.auth/admin.json' },
    dependencies: ['setup-admin'],
    testMatch: /admin\/.*/,
  },
  {
    name: 'user-tests',
    use: { storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup-user'],
    testMatch: /user\/.*/,
  },
],
```

---

## 5. Visual Regression

### Capturing Screenshots

Playwright has built-in screenshot comparison. On the first run it captures baseline images; subsequent runs compare against those baselines.

```ts
test('homepage matches visual snapshot', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('dashboard sidebar matches snapshot', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(
    page.getByRole('navigation', { name: /sidebar/i })
  ).toHaveScreenshot('sidebar.png');
});
```

### Updating Baselines

When intentional visual changes are made, update the baselines:

```bash
npx playwright test --update-snapshots
```

### CI Considerations

:::caution[Next.js Gotcha]
Screenshots differ across operating systems due to font rendering. Run visual regression tests in Docker or on a consistent CI environment to avoid false positives. The Playwright Docker image (`mcr.microsoft.com/playwright`) is the easiest path.
:::

```yaml
# .github/workflows/e2e.yml (partial)
jobs:
  e2e:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.48.0-noble
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

:::tip[Best Practice]
Commit baseline screenshots generated from your CI environment, not your local machine. This keeps diffs meaningful. Generate them once from CI and pull them into your repo.
:::

---

## 6. Accessibility

### `@axe-core/playwright` Integration

```bash
npm install -D @axe-core/playwright
```

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Scanning Specific Regions

```ts
test('navigation is accessible', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .include('nav')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### Excluding Known Issues While You Fix Them

```ts
test('dashboard is accessible (excluding known color contrast issue)', async ({ page }) => {
  await page.goto('/dashboard');

  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### Creating a Reusable A11y Helper

```ts
// e2e/helpers/a11y.ts
import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

export async function expectNoA11yViolations(
  page: Page,
  options?: { exclude?: string[]; disableRules?: string[] }
) {
  let builder = new AxeBuilder({ page });

  if (options?.exclude) {
    for (const selector of options.exclude) {
      builder = builder.exclude(selector);
    }
  }

  if (options?.disableRules) {
    builder = builder.disableRules(options.disableRules);
  }

  const results = await builder.analyze();
  expect(results.violations).toEqual([]);
}
```

```ts
// usage in a test
import { expectNoA11yViolations } from './helpers/a11y';

test('settings page is accessible', async ({ page }) => {
  await page.goto('/settings');
  await expectNoA11yViolations(page);
});
```

:::tip[Best Practice]
Run accessibility scans on every page in your app as part of your E2E suite. Create a loop over your known routes for broad coverage, and add targeted scans for interactive states (open modals, expanded accordions, error messages).
:::

---

## 7. Next.js-Specific Gotchas

### Hydration Errors in Dev Mode

Next.js dev mode runs React Strict Mode by default, which double-invokes effects and renders. This can cause:

- Duplicate network requests in dev that do not happen in production
- `console.error` about hydration mismatches when client-rendered content differs from SSR (common with timestamps, `Math.random()`, or browser-only APIs like `window.innerWidth`)

:::caution[Next.js Gotcha]
If you see hydration mismatch warnings in your Playwright tests but not in production, your tests are likely running against `next dev`. Switch to `next build && next start` for your CI config to avoid chasing dev-only issues.
:::

### `loading.tsx` and Suspense Boundaries

Next.js App Router uses `loading.tsx` files and React Suspense boundaries. When a page or layout has a `loading.tsx`, you will see the loading state flash before the actual content appears.

```ts
test('dashboard loads data after loading state', async ({ page }) => {
  await page.goto('/dashboard');

  // The loading skeleton may appear briefly
  // Wait for the full page to be ready
  await page.waitForLoadState('networkidle');

  // Now assert on actual content
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

:::caution[Next.js Gotcha]
Do not assert on content immediately after `page.goto()` if the route has a `loading.tsx`. Playwright may see the loading skeleton instead of the real content. Use `waitForLoadState('networkidle')` or wait for a specific element that only appears after data loads.
:::

### Environment Variables

Next.js has specific rules about environment variable availability:

- `NEXT_PUBLIC_*` variables are inlined at build time and available in the browser
- Non-prefixed variables are only available server-side

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    env: {
      // Server-side env vars for the Next.js process
      DATABASE_URL: 'postgresql://localhost:5432/test',
      API_SECRET: 'test-secret',
      // Client-side env vars must be set at build time
      NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
    },
  },
});
```

:::caution[Next.js Gotcha]
`NEXT_PUBLIC_*` variables are baked in during `next build`. If you set them in the `webServer.env` config, they are available for the build step. But if you build separately and only set them at `next start`, they will still hold whatever value was present at build time.
:::

### Parallel Workers Sharing One Server

By default, Playwright runs tests in parallel across multiple worker processes. All workers share the single Next.js server started by `webServer`.

This is usually fine, but be aware of:

- **Database state**: If tests mutate a shared database, parallel tests will interfere with each other. Use test isolation strategies (unique users, database transactions, or test-specific data).
- **Server-side caching**: Next.js caches fetch responses and page renders. A test that modifies data may not see the change reflected immediately due to caching.
- **Port conflicts**: Only one `webServer` instance runs. Do not try to start multiple Next.js servers on different ports for different projects. Use a single server and manage test isolation through data, not infrastructure.

```ts
// playwright.config.ts
export default defineConfig({
  // Limit workers in CI to reduce resource contention
  workers: process.env.CI ? 1 : undefined,

  // Or use a specific count
  // workers: 4,
});
```

:::tip[Best Practice]
For test isolation with a shared database, create unique test data per test (e.g., unique email addresses with UUIDs) rather than relying on a clean database. This allows safe parallel execution without complex setup/teardown.
:::
