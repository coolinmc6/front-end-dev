---
title: MSW Handler Patterns
sidebar_position: 2
---

# MSW Handler Patterns

A comprehensive guide to Mock Service Worker v2 handler patterns. MSW intercepts requests at the network level, meaning your application code makes real `fetch` or `XMLHttpRequest` calls that MSW catches before they leave the process. This page covers every handler pattern you are likely to need.

## 1. MSW v2 Basics

MSW v2 shipped a completely new API surface. Instead of the `rest` and `graphql` namespaces returning response resolvers with `(req, res, ctx)`, v2 uses standard Web API primitives (`Request`, `Response`, `URL`) and explicit helper functions.

### Core Imports

```ts
import { http, HttpResponse } from 'msw';
```

- **`http`** — namespace for REST handlers (`http.get`, `http.post`, `http.put`, `http.patch`, `http.delete`, `http.options`, `http.head`, `http.all`).
- **`HttpResponse`** — factory for building typed responses. It extends the native `Response` class with convenience methods like `HttpResponse.json()`, `HttpResponse.text()`, `HttpResponse.xml()`, and `HttpResponse.error()`.

### Hello World Handler

```ts
export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: 1, name: 'Colin' });
  }),
];
```

The resolver is a plain function that receives a single object (destructured below) and returns a `Response`.

:::caution[MSW v2 Change]
In v1 the resolver signature was `(req, res, ctx) => res(ctx.json({ ... }))`. In v2 the three positional arguments are gone. You receive a single object and return a standard `Response` (usually via `HttpResponse`).

```ts
// v1 (deprecated)
rest.get('/api/user', (req, res, ctx) => {
  return res(ctx.json({ id: 1, name: 'Colin' }));
});

// v2
http.get('/api/user', () => {
  return HttpResponse.json({ id: 1, name: 'Colin' });
});
```
:::

### Status Codes and Headers

`HttpResponse.json()` accepts an optional init object identical to the `Response` constructor:

```ts
http.post('/api/items', () => {
  return HttpResponse.json(
    { id: 42, title: 'New item' },
    {
      status: 201,
      headers: {
        'X-Request-Id': 'abc-123',
      },
    },
  );
});
```

---

## 2. REST Handlers

### Parameterized Routes

MSW supports path parameters using `:param` syntax (same as Express):

```ts
http.get('/api/users/:userId', ({ params }) => {
  const { userId } = params;

  return HttpResponse.json({
    id: userId,
    name: `User ${userId}`,
  });
});
```

Multiple parameters work as expected:

```ts
http.get('/api/orgs/:orgId/repos/:repoId', ({ params }) => {
  return HttpResponse.json({
    org: params.orgId,
    repo: params.repoId,
  });
});
```

### Reading the Request Body

For `POST`, `PUT`, and `PATCH` handlers you will often need the request body. The resolver receives a `request` property that is a standard `Request` object:

```ts
http.post('/api/users', async ({ request }) => {
  const body = await request.json();

  return HttpResponse.json(
    { id: crypto.randomUUID(), ...body },
    { status: 201 },
  );
});
```

:::caution[MSW v2 Change]
In v1 you accessed the body with `req.json()` or `req.body`. In v2 the `request` property is a native `Request` — use the standard `.json()`, `.text()`, or `.formData()` methods.
:::

### Reading Request Headers

```ts
http.get('/api/protected', ({ request }) => {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return HttpResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  return HttpResponse.json({ secret: 'data' });
});
```

### Reading Query Parameters

Use the standard `URL` API on the request:

```ts
http.get('/api/search', ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');

  return HttpResponse.json({
    query,
    page,
    results: [`Result for "${query}" on page ${page}`],
  });
});
```

### Common Response Helpers

| Helper | Purpose |
|--------|---------|
| `HttpResponse.json(body, init?)` | JSON response with `Content-Type: application/json` |
| `HttpResponse.text(body, init?)` | Plain text response |
| `HttpResponse.xml(body, init?)` | XML response |
| `HttpResponse.formData(body, init?)` | `multipart/form-data` response |
| `HttpResponse.arrayBuffer(body, init?)` | Binary response |
| `HttpResponse.error()` | Network error (no status code, connection refused) |

---

## 3. GraphQL Handlers

MSW has first-class GraphQL support through the `graphql` namespace.

### Setup

```ts
import { graphql, HttpResponse } from 'msw';
```

### Queries

Match by operation name:

```ts
graphql.query('GetUser', ({ variables }) => {
  const { id } = variables;

  return HttpResponse.json({
    data: {
      user: {
        id,
        name: 'Colin',
        email: 'colin@example.com',
      },
    },
  });
});
```

### Mutations

```ts
graphql.mutation('CreatePost', ({ variables }) => {
  const { title, body } = variables;

  return HttpResponse.json({
    data: {
      createPost: {
        id: crypto.randomUUID(),
        title,
        body,
        createdAt: new Date().toISOString(),
      },
    },
  });
});
```

### Targeting a Specific Endpoint

If your app talks to multiple GraphQL APIs, scope handlers with `graphql.link()`:

```ts
const github = graphql.link('https://api.github.com/graphql');
const internal = graphql.link('https://api.myapp.com/graphql');

export const handlers = [
  github.query('GetRepo', () => {
    return HttpResponse.json({
      data: { repository: { name: 'msw', stargazerCount: 15000 } },
    });
  }),

  internal.query('GetDashboard', () => {
    return HttpResponse.json({
      data: { dashboard: { widgets: [] } },
    });
  }),
];
```

### Simulating GraphQL Errors

GraphQL errors are returned inside the `errors` array alongside `data`:

```ts
graphql.query('GetUser', () => {
  return HttpResponse.json({
    errors: [
      {
        message: 'User not found',
        extensions: { code: 'NOT_FOUND' },
      },
    ],
  });
});
```

:::caution[MSW v2 Change]
In v1 you used `ctx.data()` and `ctx.errors()` inside the resolver composition. In v2 you build the standard `{ data, errors }` shape yourself and pass it to `HttpResponse.json()`.
:::

---

## 4. Dynamic Handlers

### Per-Test Overrides with `server.use()`

Your global handlers (the ones passed to `setupServer`) represent the "happy path." For individual tests that need different behavior, call `server.use()` to prepend temporary handlers:

```ts
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

test('shows error banner when API returns 500', async () => {
  server.use(
    http.get('/api/user', () => {
      return HttpResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 },
      );
    }),
  );

  // render component, assert error banner is visible
});
```

These override handlers are cleared automatically if you call `server.resetHandlers()` in `afterEach` (which you should).

### Handler Priority

MSW evaluates handlers **top to bottom, most recently added first**. Handlers added via `server.use()` are prepended to the list and therefore take priority over the original handlers passed to `setupServer()`.

```ts
// Global handler — returns 200
setupServer(
  http.get('/api/items', () => HttpResponse.json({ items: [] })),
);

// In a test — this handler wins because it was added later
server.use(
  http.get('/api/items', () => HttpResponse.json(null, { status: 403 })),
);
```

:::tip[Best Practice]
Always call `server.resetHandlers()` in `afterEach` so per-test overrides do not leak into subsequent tests.
:::

### One-Time Handlers

If you need a handler to fire only once, use the `{ once: true }` option:

```ts
server.use(
  http.get('/api/config', () => {
    return HttpResponse.json({ maintenance: true });
  }, { once: true }),
);
```

After the first matching request, the handler is removed and subsequent requests fall through to the next matching handler.

---

## 5. Error Simulation

### HTTP Error Responses

Return any status code by setting `status` in the response init:

```ts
// 404 Not Found
http.get('/api/users/:id', () => {
  return HttpResponse.json(
    { error: 'User not found' },
    { status: 404 },
  );
});

// 500 Internal Server Error
http.post('/api/checkout', () => {
  return HttpResponse.json(
    { error: 'Something went wrong' },
    { status: 500 },
  );
});
```

### Network Errors

Simulate a connection failure (e.g. DNS resolution error, refused connection). The request never receives an HTTP status — `fetch` itself rejects:

```ts
http.get('/api/health', () => {
  return HttpResponse.error();
});
```

In your test the `fetch` call will throw a `TypeError: Failed to fetch` (or equivalent), which is what your error boundary or catch block should handle.

### Timeouts (Delayed Responses)

MSW ships a `delay()` helper for simulating slow or timed-out responses:

```ts
import { http, HttpResponse, delay } from 'msw';

http.get('/api/slow', async () => {
  // Wait 3 seconds before responding
  await delay(3000);
  return HttpResponse.json({ data: 'finally' });
});
```

To simulate an infinite hang (useful for testing loading spinners or abort signals), pass `'infinite'`:

```ts
http.get('/api/stuck', async () => {
  await delay('infinite');
  return HttpResponse.json({ data: 'never sent' });
});
```

:::tip[Best Practice]
When testing timeouts, pair `delay('infinite')` with `AbortController` logic in your component or use Jest fake timers to avoid your tests actually waiting.
:::

### Combining Errors in a Test

```ts
test('retries once then shows error', async () => {
  let callCount = 0;

  server.use(
    http.get('/api/data', () => {
      callCount++;
      if (callCount === 1) {
        return HttpResponse.error(); // first call: network error
      }
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 },
      ); // second call: 500
    }),
  );

  // render, assert retry happened, assert error UI
});
```

---

## 6. Request Assertions

Sometimes you need to verify that your code sends the right requests — not just that it handles responses correctly.

### Capturing Requests

Store references to intercepted requests inside your handler, then assert after the UI action:

```ts
test('sends correct payload on form submit', async () => {
  let capturedBody: Record<string, unknown> | null = null;

  server.use(
    http.post('/api/users', async ({ request }) => {
      capturedBody = await request.json();
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  // render form, fill fields, submit
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(capturedBody).toEqual({
      name: 'Colin',
      email: 'colin@example.com',
    });
  });
});
```

### Inspecting Headers

```ts
test('attaches auth token to request', async () => {
  let authHeader: string | null = null;

  server.use(
    http.get('/api/protected', ({ request }) => {
      authHeader = request.headers.get('Authorization');
      return HttpResponse.json({ ok: true });
    }),
  );

  // trigger the fetch
  await waitFor(() => {
    expect(authHeader).toBe('Bearer test-token-123');
  });
});
```

### Counting Requests

```ts
test('does not re-fetch when data is cached', async () => {
  let requestCount = 0;

  server.use(
    http.get('/api/items', () => {
      requestCount++;
      return HttpResponse.json({ items: ['a', 'b'] });
    }),
  );

  // render component — triggers first fetch
  // navigate away, navigate back — should use cache

  await waitFor(() => {
    expect(requestCount).toBe(1);
  });
});
```

:::tip[Best Practice]
Wrap request assertions in `waitFor()` because the request happens asynchronously. Without `waitFor`, the assertion may run before the handler fires.
:::

---

## 7. Sequential Responses

When you need the same endpoint to return different responses on consecutive calls, there are two clean patterns.

### Pattern A: Stateful Counter

Use a mutable counter inside the handler closure:

```ts
test('shows loading, then data, then stale indicator on refetch failure', async () => {
  let callCount = 0;

  server.use(
    http.get('/api/feed', () => {
      callCount++;

      if (callCount === 1) {
        return HttpResponse.json({ posts: [{ id: 1, title: 'Hello' }] });
      }

      // Second call and beyond: simulate failure
      return HttpResponse.json(
        { error: 'Service unavailable' },
        { status: 503 },
      );
    }),
  );

  // first render — sees posts
  // trigger refetch — sees error / stale data indicator
});
```

### Pattern B: Generator Function

For complex multi-step sequences, a generator keeps the logic readable:

```ts
function* feedResponses() {
  // First call: success
  yield HttpResponse.json({ posts: [{ id: 1, title: 'Hello' }] });

  // Second call: empty
  yield HttpResponse.json({ posts: [] });

  // Third call and beyond: error
  while (true) {
    yield HttpResponse.json(
      { error: 'Rate limited' },
      { status: 429 },
    );
  }
}

test('handles degrading API responses', async () => {
  const responses = feedResponses();

  server.use(
    http.get('/api/feed', () => {
      return responses.next().value;
    }),
  );

  // assertions for each stage
});
```

### Pattern C: `once` Option Stacking

Stack multiple handlers for the same route with `{ once: true }`. They fire in last-added-first order, each consumed after one use:

```ts
server.use(
  // This fires third (base fallback, not once)
  http.get('/api/feed', () => {
    return HttpResponse.json({ error: 'Gone' }, { status: 410 });
  }),
);

server.use(
  // This fires second (consumed after one use)
  http.get('/api/feed', () => {
    return HttpResponse.json({ posts: [] });
  }, { once: true }),
);

server.use(
  // This fires first (consumed after one use)
  http.get('/api/feed', () => {
    return HttpResponse.json({ posts: [{ id: 1, title: 'Hello' }] });
  }, { once: true }),
);
```

:::tip[Best Practice]
The generator pattern is the most scalable for complex sequences. The `once` stacking pattern is convenient for two or three steps but becomes hard to read beyond that. The stateful counter works well when the branching logic is simple (e.g., first call vs. everything else).
:::

---

## Further Reading

- [MSW v2 docs — Describing REST API](https://mswjs.io/docs/network-behavior/rest)
- [MSW v2 docs — Describing GraphQL API](https://mswjs.io/docs/network-behavior/graphql)
- [MSW v2 docs — Response resolver](https://mswjs.io/docs/concepts/response-resolver)
- [MSW v2 Migration Guide](https://mswjs.io/docs/migrations/1.x-to-2.x)
