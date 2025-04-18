# Playwright Recipes


## 1. Launch Browser and Open a Page
```ts
import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  // ...your actions here...
  await browser.close();
})();
```

---

## 2. Basic Test with Playwright Test Runner
```ts
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
});
```

---

## 3. Take a Screenshot
```ts
await page.goto('https://example.com');
await page.screenshot({ path: 'example.png', fullPage: true });
```

---

## 4. Mock a Network Response
```ts
await page.route('**/api/data', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ items: [] }),
  })
);
await page.goto('https://example.com/data');
```

---

## 5. Record a Video of the Session
```ts
import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  const page = await context.newPage();
  await page.goto('https://example.com');
  await browser.close(); // Video will be saved in the `videos/` folder
})();
```

---

## 6. Using a Worker-Scoped Fixture
```ts
import { test as base } from '@playwright/test';

type Fixtures = { token: string };

export const test = base.extend<Fixtures>({
  token: async ({}, use) => {
    // setup: fetch or create an auth token
    const token = await getAuthToken();
    await use(token);
  },
});

// usage in a test:
// test('use token fixture', async ({ page, token }) => { ... })
```

