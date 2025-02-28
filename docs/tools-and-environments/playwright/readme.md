---
title: Playwright
---

# Playwright

- In Playwright, workers are used for parallel execution of tests. It manages the distribution of test files
across multiple worker worker processes so that tests can run concurrently without interfering with each other
- The concept of a worker in Playwright is built into Playwright - it's not just leveraging a general JavaScript
feature
- **JavaScript Workers vs Playwright Workers:**
  - In the broader JavaScript ecosystem, there are features like Web Workers or Worker Threads in Node.js, which 
  are used to perform tasks in parallel threads. However, these are primarily used for concurrent execution of 
  code within a single application.
  - Playwright's workers are more about orchestrating entire test processes. Each worker runs in its own process,
  which can include its own browser instance, isolated environment, and resources.
- To implement a screenshot library that uses Playwright, we needed to use a **worker-scoped fixture**. Again, a
**worker** is a process that runs your tests. A **fixture** is a piece of setup code that is used to prepare your
environment for your tests (e.g. set up databases, start servers, etc). Worker-scoped fixtures are set up once per
worker process and shared across all the tests running in the worker.
  - more on [Playwright fixtures](https://playwright.dev/docs/test-fixtures)
- 

[[↑] Back to top](#top)
