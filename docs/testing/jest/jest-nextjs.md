---
sidebar_position: 5
---

# Jest + Next.js Testing Patterns

A comprehensive guide to testing Next.js applications with Jest and React Testing Library. Covers both
the Pages Router and App Router, mocking Next.js-specific modules, testing API routes, data fetching,
and building a reusable custom render function.

## Setup

Next.js ships its own Jest integration via `next/jest`, which handles the SWC transform, CSS/image
mocking, and environment loading automatically.

### Install dependencies

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### `jest.config.ts`

```ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Path to your Next.js app — loads next.config.js and .env files
  dir: "./",
});

const config: Config = {
  // Use jsdom for component tests, node for API route / utility tests
  testEnvironment: "jsdom",

  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],

  // Optional: collect coverage from specific directories
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],

  // Module name mapping (mirrors tsconfig paths)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// next/jest wraps your config so SWC transforms are applied
export default createJestConfig(config);
```

### `jest.setup.ts`

```ts
import "@testing-library/jest-dom";
```

:::tip[Best Practice]
Use `jsdom` as the default environment for component tests. If you have API route tests or
pure-Node utility tests, override per-file with a docblock:

```ts
/**
 * @jest-environment node
 */
```

:::

### Environment choice: `jsdom` vs `node`

| Environment | Use when |
|-------------|----------|
| `jsdom` | Testing React components, anything that touches the DOM |
| `node` | Testing API routes, server utilities, database helpers |

You can set a per-file environment by adding a docblock comment at the top of the test file.
This overrides the global `testEnvironment` setting.

---

## Mocking `next/navigation`

The `next/navigation` module (`useRouter`, `usePathname`, `useSearchParams`) is used heavily in
App Router components. Because these hooks rely on Next.js internals, they must be mocked in tests.

### Full mock pattern

```ts
import { useRouter, usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useServerInsertedHTML: jest.fn(),
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

// Type-safe helper to set up return values
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;
```

### Per-test configuration

```ts
describe("NavigationBar", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });
    mockUsePathname.mockReturnValue("/dashboard");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tab=overview"));
  });

  it("highlights the active link based on pathname", () => {
    render(<NavigationBar />);

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute("aria-current", "page");
  });

  it("navigates to settings when the settings button is clicked", async () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({
      push: pushMock,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });

    const user = userEvent.setup();
    render(<NavigationBar />);

    await user.click(screen.getByRole("button", { name: /settings/i }));

    expect(pushMock).toHaveBeenCalledWith("/settings");
  });

  it("reads search params to determine active tab", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("tab=analytics"));

    render(<NavigationBar />);

    expect(screen.getByRole("tab", { name: /analytics/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
```

:::caution[Next.js Gotcha]
`useSearchParams` returns a read-only `URLSearchParams` instance. If your component calls
`.get()` or `.getAll()` on it, the `new URLSearchParams("key=value")` mock handles that
correctly. But if you try to mock it with a plain object, `.get()` calls will throw.
:::

---

## Mocking `next/image` and `next/link`

`next/image` applies transforms and optimization that do not work in jsdom. `next/link` uses
internal router context. Simple mocks prevent transform errors and let you test the rendered output.

### `next/image` mock

Create `__mocks__/next/image.tsx` at your project root (or configure via `moduleNameMapper`):

```tsx
// __mocks__/next/image.tsx
import React from "react";

const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} />;
};

export default MockImage;
```

Or mock inline in `jest.setup.ts`:

```ts
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));
```

### `next/link` mock

```tsx
// __mocks__/next/link.tsx
import React from "react";

const MockLink = ({
  children,
  href,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
}) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default MockLink;
```

:::tip[Best Practice]
Place file-based mocks in a `__mocks__` directory at the project root. Jest automatically
picks them up without needing `jest.mock()` in every file. For `next/image`, use the
file-based mock so every test gets a plain `<img>` without repetition.
:::

---

## Testing Pages Router Pages

### Rendering a page component

Pages Router page components are standard React components. Render them directly:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/pages/index";

describe("HomePage", () => {
  it("renders the welcome heading", () => {
    render(<HomePage posts={[]} />);

    expect(
      screen.getByRole("heading", { name: /welcome/i })
    ).toBeVisible();
  });
});
```

### Mocking `getServerSideProps`

`getServerSideProps` runs on the server, not in the component. Test it as a standalone async function:

```ts
import { getServerSideProps } from "@/pages/dashboard";

describe("getServerSideProps", () => {
  it("returns user data when authenticated", async () => {
    // Mock your data source
    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 1, name: "Colin" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const context = {
      req: {
        headers: { cookie: "session=abc123" },
      },
      res: {},
      params: {},
      query: {},
      resolvedUrl: "/dashboard",
    } as any;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        user: { id: 1, name: "Colin" },
      },
    });
  });

  it("redirects when not authenticated", async () => {
    const context = {
      req: { headers: {} },
      res: {},
      params: {},
      query: {},
      resolvedUrl: "/dashboard",
    } as any;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      redirect: {
        destination: "/login",
        permanent: false,
      },
    });
  });
});
```

### Mocking `getStaticProps`

Same pattern -- call it directly, mock any external data:

```ts
import { getStaticProps } from "@/pages/blog/[slug]";

describe("getStaticProps", () => {
  it("fetches the correct blog post", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          title: "Testing in Next.js",
          body: "A guide to testing...",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const result = await getStaticProps({
      params: { slug: "testing-in-nextjs" },
    } as any);

    expect(result).toEqual({
      props: {
        post: {
          title: "Testing in Next.js",
          body: "A guide to testing...",
        },
      },
      revalidate: 60,
    });
  });
});
```

:::tip[Best Practice]
Test `getServerSideProps` and `getStaticProps` separately from the page component. Pass their
output as props to the component in a second test. This separates data-fetching logic from
rendering logic and makes both easier to maintain.
:::

---

## Testing App Router Pages

### Client Components

Client Components (files with `"use client"`) are standard React components. Test them with
React Testing Library as usual:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("increments the count on click", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeVisible();

    await user.click(screen.getByRole("button", { name: /increment/i }));

    expect(screen.getByText("Count: 1")).toBeVisible();
  });
});
```

### Server Components

Server Components are async functions that run on the server. Jest + jsdom cannot directly
render async React components.

:::caution[Next.js Gotcha]
You cannot `render(<ServerComponent />)` in a jsdom test because:

1. Server Components can be `async` functions -- React Testing Library does not support rendering
   async components.
2. They may use server-only APIs (`cookies()`, `headers()`, database calls) that do not exist in
   the test environment.
3. `next/jest` does not set up the RSC runtime.

The community and Next.js team recommend testing the **data function** separately and testing
the **UI** via integration/E2E tests.
:::

**Strategy: extract and test the data function**

```ts
// lib/posts.ts
export async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}
```

```tsx
// app/blog/[slug]/page.tsx
import { getPost } from "@/lib/posts";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

```ts
// lib/posts.test.ts
import { getPost } from "@/lib/posts";

describe("getPost", () => {
  afterEach(() => jest.restoreAllMocks());

  it("returns the post data", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ title: "Hello", content: "<p>World</p>" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const post = await getPost("hello");

    expect(post).toEqual({ title: "Hello", content: "<p>World</p>" });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/posts/hello");
  });

  it("throws on failed fetch", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 404 })
    );

    await expect(getPost("nonexistent")).rejects.toThrow("Failed to fetch post");
  });
});
```

:::tip[Best Practice]
For Server Components, isolate your data-fetching and transformation logic into separate
functions in a `lib/` or `utils/` directory. These are pure async functions that are trivial
to test with Jest. Use Playwright or Cypress for full-page Server Component rendering tests.
:::

---

## Testing API Routes

### Pages Router: `handler(req, res)`

Pages Router API routes export a handler that receives `req` and `res` objects. Use
`node-mocks-http` to create mock request/response objects:

```bash
npm install -D node-mocks-http
```

```ts
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await fetchUsers();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const user = await createUser({ name, email });
    return res.status(201).json(user);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
```

```ts
/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/users";

// Mock your data layer
jest.mock("@/lib/db", () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    { id: 1, name: "Alice", email: "alice@example.com" },
  ]),
  createUser: jest.fn().mockResolvedValue({
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  }),
}));

describe("/api/users", () => {
  it("GET returns a list of users", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual([
      { id: 1, name: "Alice", email: "alice@example.com" },
    ]);
  });

  it("POST creates a new user", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: { name: "Bob", email: "bob@example.com" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({
      id: 2,
      name: "Bob",
      email: "bob@example.com",
    });
  });

  it("POST returns 400 when fields are missing", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: { name: "Bob" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: "Name and email are required",
    });
  });

  it("returns 405 for unsupported methods", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "DELETE",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
```

### App Router: `GET(request)` / `POST(request)` pattern

App Router Route Handlers export named functions per HTTP method. They use the Web
`Request`/`Response` API:

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const user = await createUser({ name, email });
  return NextResponse.json(user, { status: 201 });
}
```

```ts
/**
 * @jest-environment node
 */
import { GET, POST } from "@/app/api/users/route";

jest.mock("@/lib/db", () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    { id: 1, name: "Alice", email: "alice@example.com" },
  ]),
  createUser: jest.fn().mockResolvedValue({
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  }),
}));

describe("GET /api/users", () => {
  it("returns a list of users", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([
      { id: 1, name: "Alice", email: "alice@example.com" },
    ]);
  });
});

describe("POST /api/users", () => {
  it("creates a new user", async () => {
    const request = new Request("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ name: "Bob", email: "bob@example.com" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({
      id: 2,
      name: "Bob",
      email: "bob@example.com",
    });
  });

  it("returns 400 when fields are missing", async () => {
    const request = new Request("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ name: "Bob" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Name and email are required" });
  });
});
```

:::caution[Next.js Gotcha]
App Router Route Handlers use the Web `Request`/`Response` API, not the Node `req`/`res` API.
Use `@jest-environment node` for these tests since they do not need the DOM and may rely on
Node-specific APIs. You can construct `Request` objects directly -- no need for `node-mocks-http`.
:::

---

## Data Fetching

### Mocking `fetch` with `jest.spyOn`

The simplest way to mock `fetch` in server-side data functions:

```ts
describe("fetchPosts", () => {
  afterEach(() => jest.restoreAllMocks());

  it("returns parsed posts", async () => {
    const mockPosts = [
      { id: 1, title: "First Post" },
      { id: 2, title: "Second Post" },
    ];

    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockPosts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const posts = await fetchPosts();

    expect(posts).toEqual(mockPosts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/posts",
      expect.objectContaining({
        headers: { Authorization: "Bearer test-token" },
      })
    );
  });

  it("returns an empty array on network error", async () => {
    jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const posts = await fetchPosts();

    expect(posts).toEqual([]);
  });
});
```

### Using MSW (Mock Service Worker)

MSW intercepts requests at the network level, which is more robust than mocking `fetch` directly.
It works with both client and server code.

```bash
npm install -D msw
```

**Set up handlers:**

```ts
// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/posts", () => {
    return HttpResponse.json([
      { id: 1, title: "First Post" },
      { id: 2, title: "Second Post" },
    ]);
  }),

  http.get("https://api.example.com/posts/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id: Number(id), title: `Post ${id}` });
  }),

  http.post("https://api.example.com/posts", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 3, ...body },
      { status: 201 }
    );
  }),
];
```

**Set up the server for Jest:**

```ts
// mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

**Wire it into Jest setup:**

```ts
// jest.setup.ts
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**Use in tests with per-test overrides:**

```ts
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("PostList", () => {
  it("renders posts from the API", async () => {
    render(<PostList />);

    expect(await screen.findByText("First Post")).toBeVisible();
    expect(screen.getByText("Second Post")).toBeVisible();
  });

  it("shows an error message when the API fails", async () => {
    // Override the handler for this single test
    server.use(
      http.get("https://api.example.com/posts", () => {
        return HttpResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      })
    );

    render(<PostList />);

    expect(await screen.findByText(/something went wrong/i)).toBeVisible();
  });
});
```

:::tip[Best Practice]
Prefer MSW over `jest.spyOn(global, "fetch")` when testing components that fetch data. MSW
catches requests regardless of the fetch implementation (native fetch, axios, etc.) and
keeps your test closer to production behavior. Use `jest.spyOn` for unit-testing standalone
data functions where the simplicity is worth the tradeoff.
:::

---

## Custom Render

Most Next.js apps wrap components in providers (theme, auth, query client, etc.). Creating a
custom render function avoids repeating this boilerplate in every test.

### Building the custom render

```tsx
// test-utils/render.tsx
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

// Create a fresh QueryClient for each test to prevent state leaks
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Fail fast in tests
        gcTime: Infinity, // Prevent garbage collection during test
      },
    },
    // Suppress console.error for expected query failures
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  user?: { id: string; name: string; email: string } | null;
  theme?: "light" | "dark";
  queryClient?: QueryClient;
}

function AllProviders({
  children,
  user = null,
  theme = "light",
  queryClient,
}: {
  children: React.ReactNode;
  user?: { id: string; name: string; email: string } | null;
  theme?: "light" | "dark";
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialUser={user}>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const {
    user = null,
    theme = "light",
    queryClient = createTestQueryClient(),
    ...renderOptions
  } = options;

  const userEventInstance = userEvent.setup();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllProviders user={user} theme={theme} queryClient={queryClient}>
      {children}
    </AllProviders>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    userEvent: userEventInstance,
    queryClient,
  };
}

// Re-export everything from RTL so test files only import from test-utils
export * from "@testing-library/react";
export { renderWithProviders as render };
```

### Using the custom render

```tsx
import { render, screen } from "@/test-utils/render";

describe("Dashboard", () => {
  it("shows the user name when logged in", async () => {
    const { userEvent } = render(<Dashboard />, {
      user: { id: "1", name: "Colin", email: "colin@example.com" },
      theme: "dark",
    });

    expect(screen.getByText("Welcome, Colin")).toBeVisible();

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));

    expect(screen.getByRole("menuitem", { name: /settings/i })).toBeVisible();
  });

  it("redirects to login when not authenticated", () => {
    render(<Dashboard />, { user: null });

    expect(screen.getByText(/please log in/i)).toBeVisible();
  });
});
```

:::tip[Best Practice]
Configure the path alias in `jest.config.ts` so you can import from `@/test-utils/render`
throughout your test suite. This keeps the import clean and ensures every test gets the same
provider setup. Return `userEvent` from the custom render so each test gets a properly
initialized instance via `userEvent.setup()`.
:::

:::caution[Next.js Gotcha]
If you use `next/navigation` hooks inside provider components (e.g., an auth provider that
calls `useRouter`), you still need the `jest.mock("next/navigation")` call in addition to
the custom render. The custom render wraps providers but does not mock Next.js internals.
:::
