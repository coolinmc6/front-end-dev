---
title: Testing
---

# Testing Overview

On this page we’ll cover the high‑level strategy and categories of tests you’ll typically use in a modern front‑end codebase, how they fit together, and the most popular tools in each category.

## 1. Types of Tests

### 1.1 Unit Tests  
– Verify the smallest pieces of logic in isolation (functions, hooks, reducers)  
– Fast to run, low maintenance  
– Popular tools: Jest, Mocha, Jasmine

### 1.2 Integration Tests  
– Exercise multiple units working together (components + hooks + utilities + API mocks)  
– Catches interface mismatches between modules  
– Popular tools: Jest + React Testing Library, Testing Library for Vue/Angular

### 1.3 End‑to‑End (E2E) Tests  
– Drive the real application in a browser (click buttons, fill forms, navigate pages)  
– Validates full stack user flows  
– Popular tools: Playwright, Cypress, TestCafe

### 1.4 Visual Regression Tests  
– Capture “before” and “after” snapshots of components/pages  
– Detect unintended style/layout changes  
– Popular tools: Storybook (with Chromatic or Backstop.js), Percy

### 1.5 Other Categories  
– Accessibility Testing (axe, Pa11y)  
– Performance Testing (Lighthouse, WebPageTest)  
– Contract/Mocked API Tests (MSW, Pact)

---

## 2. The Testing Pyramid

      E2E Tests (few, slow, high confidence)
     Integration Tests (more, medium speed/confidence)
       Unit Tests (many, fast, low confidence)
Visual Regression & A11y (parallel to each layer)

Aim for a balanced mix:
- Lots of fast unit tests
- Moderate number of integration tests
- Few end‑to‑end tests
- Layer in visual and accessibility checks at each stage.

## 3. Tooling Matrix

| Category              | Primary Tools                          | Notes                                   |
|-----------------------|----------------------------------------|-----------------------------------------|
| Unit & Integration    | Jest + Testing Library                 | Mock APIs with MSW                      |
| API Mocks             | MSW (Mock Service Worker)              | Intercept fetch/XHR in unit & E2E tests |
| End‑to‑End (E2E)      | Playwright, Cypress                    | Cross‑browser, parallelizable           |
| Component Catalog     | Storybook                              | Visual regression via Chromatic/Percy   |
| Visual Regression     | Chromatic, Percy, Backstop.js          | Integrates with Storybook or CLI        |
| Accessibility         | axe‑core, jest‑axe, Pa11y              | Plugins/loaders for each test type      |

## 4. Workflow & Best Practices
- Run unit tests and lint on every commit (pre‑commit hook / GitHub Actions)
- Use MSW to mock API responses in both unit/integration and E2E runs
- Leverage CI parallelism for Playwright/Cypress suites
- Automate visual snapshot reviews in PRs (Chromatic or Percy)
- Enforce coverage thresholds and fail builds on regressions
- Isolate flaky tests and quarantine until fixed