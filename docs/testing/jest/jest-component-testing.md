---
sidebar_position: 6
---

# Component Testing with React Testing Library

Patterns and best practices for testing React components with React Testing Library (RTL) and Jest.
Covers query priority, user events, async patterns, forms, custom hooks, accessibility, and common
pitfalls.

## Query Priority

RTL provides multiple query types. The order below reflects how a real user or assistive technology
finds elements -- prefer queries higher in the list.

| Priority | Query | When to use |
|----------|-------|-------------|
| 1 | `getByRole` | Buttons, links, headings, textboxes, checkboxes -- anything with an ARIA role |
| 2 | `getByLabelText` | Form fields associated with a `<label>` |
| 3 | `getByPlaceholderText` | When no label exists (less accessible, but still visible to the user) |
| 4 | `getByText` | Non-interactive elements like paragraphs, spans, divs |
| 5 | `getByDisplayValue` | Input/select/textarea that already has a value |
| 6 | `getByAltText` | Images, areas, custom elements with `alt` |
| 7 | `getByTitle` | Elements with a `title` attribute (rarely the best choice) |
| 8 | `getByTestId` | Last resort when no semantic query works |

### Examples

```tsx
// BEST: getByRole queries the accessibility tree
screen.getByRole("button", { name: /submit/i });
screen.getByRole("heading", { level: 2, name: /dashboard/i });
screen.getByRole("textbox", { name: /email/i });
screen.getByRole("checkbox", { name: /agree to terms/i });
screen.getByRole("link", { name: /read more/i });

// GOOD: getByLabelText for form fields
screen.getByLabelText(/password/i);

// OK: getByText for non-interactive content
screen.getByText(/no results found/i);

// LAST RESORT: getByTestId when nothing else works
screen.getByTestId("complex-svg-chart");
```

:::tip[Best Practice]
`getByRole` should be your default query. It validates that the element is accessible (has the
correct ARIA role) while also being resilient to DOM structure changes. If you cannot find an
element with `getByRole`, that often means the component has an accessibility issue.
:::

### `queryBy` vs `getBy` vs `findBy`

| Method | Throws on missing? | Async? | Use for |
|--------|-------------------|--------|---------|
| `getBy*` | Yes | No | Element should be present right now |
| `queryBy*` | No (returns `null`) | No | Asserting element is NOT present |
| `findBy*` | Yes (rejects) | Yes | Element will appear after async work |

```tsx
// Element is present
expect(screen.getByText("Hello")).toBeVisible();

// Element is NOT present
expect(screen.queryByText("Goodbye")).not.toBeInTheDocument();

// Element will appear after loading
expect(await screen.findByText("Data loaded")).toBeVisible();
```

---

## User Events

### `userEvent` vs `fireEvent`

`fireEvent` dispatches a single DOM event. `userEvent` simulates the full browser interaction
(focus, keydown, keyup, input, change, click, etc.), which is closer to real user behavior.

```tsx
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";

// fireEvent: dispatches one synthetic click event
fireEvent.click(button);

// userEvent: simulates pointer move, pointer down, pointer up, click, focus
await userEvent.click(button);
```

:::caution
Always prefer `userEvent` over `fireEvent`. `fireEvent` can mask bugs because it skips events
that a real browser would dispatch (e.g., `focus` before `click`, `keydown` before `input`).
Reserve `fireEvent` for edge cases where you need to dispatch a specific event that
`userEvent` does not support.
:::

### `userEvent.setup()` pattern (v14+)

Starting with `@testing-library/user-event` v14, always call `userEvent.setup()` before
rendering. This creates an instance with a shared state (clipboard, pointer position, keyboard
state) across all interactions in the test.

```tsx
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("SearchBar", () => {
  it("filters results as the user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByRole("searchbox", { name: /search/i });

    await user.type(input, "react testing");

    expect(input).toHaveValue("react testing");
    expect(screen.getByText(/3 results/i)).toBeVisible();
  });

  it("clears input when escape is pressed", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByRole("searchbox", { name: /search/i });

    await user.type(input, "react");
    expect(input).toHaveValue("react");

    await user.keyboard("{Escape}");
    expect(input).toHaveValue("");
  });
});
```

### Keyboard events

```tsx
it("navigates dropdown with arrow keys", async () => {
  const user = userEvent.setup();
  render(<Dropdown options={["Apple", "Banana", "Cherry"]} />);

  // Open the dropdown
  await user.click(screen.getByRole("combobox"));

  // Navigate down
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");

  // Select with Enter
  await user.keyboard("{Enter}");

  expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
});

it("supports keyboard shortcuts", async () => {
  const user = userEvent.setup();
  render(<Editor />);

  // Ctrl+S / Cmd+S to save
  await user.keyboard("{Control>}s{/Control}");

  expect(screen.getByText(/saved/i)).toBeVisible();
});
```

### Typing and clearing

```tsx
it("handles type, clear, and re-type", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Type an email
  await user.type(emailInput, "wrong@email.com");
  expect(emailInput).toHaveValue("wrong@email.com");

  // Clear and re-type
  await user.clear(emailInput);
  expect(emailInput).toHaveValue("");

  await user.type(emailInput, "correct@email.com");
  expect(emailInput).toHaveValue("correct@email.com");
});
```

### Clipboard operations

```tsx
it("supports copy and paste", async () => {
  const user = userEvent.setup();
  render(<CopyableField value="secret-token-123" />);

  // Click the copy button
  await user.click(screen.getByRole("button", { name: /copy/i }));

  // Paste into another field
  const input = screen.getByRole("textbox", { name: /paste here/i });
  await user.click(input);
  await user.paste();

  expect(input).toHaveValue("secret-token-123");
});
```

---

## Async Patterns

### `waitFor`

Use `waitFor` when you need to wait for a condition that will eventually be true (e.g., after
a state update triggered by an async operation):

```tsx
import { render, screen, waitFor } from "@testing-library/react";

it("shows success message after form submission", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.type(screen.getByRole("textbox", { name: /name/i }), "Colin");
  await user.type(
    screen.getByRole("textbox", { name: /message/i }),
    "Hello there"
  );
  await user.click(screen.getByRole("button", { name: /send/i }));

  await waitFor(() => {
    expect(screen.getByText(/message sent/i)).toBeVisible();
  });
});
```

:::caution
Do not put side-effects inside `waitFor`. It re-runs the callback until it passes (or times
out), so anything inside it will execute multiple times. Only put assertions inside.

```tsx
// BAD: click runs multiple times
await waitFor(() => {
  userEvent.click(button);
  expect(result).toBeVisible();
});

// GOOD: click once, then wait for the result
await userEvent.click(button);
await waitFor(() => {
  expect(result).toBeVisible();
});
```

:::

### `findBy*` queries

`findBy*` is a combination of `getBy*` and `waitFor`. It repeatedly queries the DOM until the
element appears or the timeout expires:

```tsx
it("loads and displays user data", async () => {
  render(<UserProfile userId="123" />);

  // Shows loading state immediately
  expect(screen.getByText(/loading/i)).toBeVisible();

  // Wait for data to appear
  const userName = await screen.findByText("Colin McNamara");
  expect(userName).toBeVisible();

  // Loading indicator should be gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

### Testing loading, error, and success states

```tsx
describe("UserList", () => {
  it("shows loading spinner, then data", async () => {
    render(<UserList />);

    // Loading state
    expect(screen.getByRole("progressbar")).toBeVisible();

    // Success state
    expect(await screen.findByText("Alice")).toBeVisible();
    expect(screen.getByText("Bob")).toBeVisible();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("shows error state when fetch fails", async () => {
    // Override fetch or MSW handler to return an error
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    render(<UserList />);

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(screen.getByText(/failed to load users/i)).toBeVisible();
  });

  it("shows empty state when no users exist", async () => {
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json([]);
      })
    );

    render(<UserList />);

    expect(await screen.findByText(/no users found/i)).toBeVisible();
  });
});
```

:::tip[Best Practice]
Always test the three states of async data: loading, success, and error. These represent
the full user experience of a data-fetching component and catch the most common bugs
(missing loading indicator, unhandled errors, empty state).
:::

---

## Form Testing

### Input and controlled components

```tsx
describe("ProfileForm", () => {
  it("populates fields with initial values", () => {
    render(
      <ProfileForm
        initialValues={{ name: "Colin", email: "colin@example.com" }}
      />
    );

    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      "Colin"
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "colin@example.com"
    );
  });

  it("updates controlled inputs as the user types", async () => {
    const user = userEvent.setup();
    render(<ProfileForm initialValues={{ name: "", email: "" }} />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });

    await user.type(nameInput, "Colin");

    expect(nameInput).toHaveValue("Colin");
  });
});
```

### Validation messages

```tsx
describe("RegistrationForm", () => {
  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);

    // Submit without filling in fields
    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/name is required/i)).toBeVisible();
    expect(screen.getByText(/email is required/i)).toBeVisible();
    expect(screen.getByText(/password is required/i)).toBeVisible();
  });

  it("shows email format error for invalid email", async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);

    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "not-an-email"
    );
    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/enter a valid email/i)).toBeVisible();
  });

  it("clears errors when the user corrects input", async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);

    // Trigger validation
    await user.click(screen.getByRole("button", { name: /register/i }));
    expect(screen.getByText(/name is required/i)).toBeVisible();

    // Fix the error
    await user.type(screen.getByRole("textbox", { name: /name/i }), "Colin");

    // Error should clear (depending on your validation strategy)
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });
});
```

### Form submission

```tsx
describe("ContactForm", () => {
  it("calls onSubmit with form data", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: /name/i }),
      "Colin"
    );
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "colin@example.com"
    );
    await user.type(
      screen.getByRole("textbox", { name: /message/i }),
      "Hello!"
    );

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Colin",
      email: "colin@example.com",
      message: "Hello!",
    });
  });

  it("disables submit button while submitting", async () => {
    const handleSubmit = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /name/i }), "Colin");
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "colin@example.com"
    );
    await user.type(
      screen.getByRole("textbox", { name: /message/i }),
      "Hello!"
    );

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /send/i })
      ).toBeEnabled();
    });
  });
});
```

### Controlled vs uncontrolled forms

```tsx
// Controlled: value comes from state, onChange updates state
it("works with controlled inputs", async () => {
  const user = userEvent.setup();

  function ControlledInput() {
    const [value, setValue] = useState("");
    return (
      <input
        aria-label="Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  render(<ControlledInput />);
  const input = screen.getByRole("textbox", { name: /name/i });

  await user.type(input, "Colin");

  expect(input).toHaveValue("Colin");
});

// Uncontrolled: value lives in the DOM, read via ref or FormData
it("works with uncontrolled inputs", async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  function UncontrolledForm() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          handleSubmit(Object.fromEntries(data));
        }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue="" />
        <button type="submit">Submit</button>
      </form>
    );
  }

  render(<UncontrolledForm />);

  await user.type(screen.getByRole("textbox", { name: /name/i }), "Colin");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({ name: "Colin" });
});
```

---

## Testing Hooks

### `renderHook` basics

`renderHook` from `@testing-library/react` lets you test custom hooks in isolation without
creating a wrapper component.

```tsx
import { renderHook, act } from "@testing-library/react";

// Hook under test
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
}

describe("useCounter", () => {
  it("starts with the initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it("defaults to 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it("increments the count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrements the count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("resets to the initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
```

### Hooks with effects and async behavior

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));

    expect(result.current).toBe("hello");
  });

  it("updates the value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } }
    );

    // Change the input value
    rerender({ value: "world", delay: 500 });

    // Value should NOT have changed yet
    expect(result.current).toBe("hello");

    // Fast-forward past the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should be updated
    expect(result.current).toBe("world");
  });

  it("resets the timer when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } }
    );

    rerender({ value: "ab", delay: 300 });
    act(() => jest.advanceTimersByTime(200));

    rerender({ value: "abc", delay: 300 });
    act(() => jest.advanceTimersByTime(200));

    // Only 200ms since last change, should still be "a"
    expect(result.current).toBe("a");

    act(() => jest.advanceTimersByTime(100));

    // Now 300ms since last change
    expect(result.current).toBe("abc");
  });
});
```

### Hooks that need providers

```tsx
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

describe("useAuth", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider initialUser={{ id: "1", name: "Colin" }}>
      {children}
    </AuthProvider>
  );

  it("returns the current user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual({ id: "1", name: "Colin" });
  });

  it("throws when used outside provider", () => {
    // Suppress console.error from the expected error
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");

    spy.mockRestore();
  });
});
```

---

## Accessibility Testing

### Built-in jest-dom matchers

`@testing-library/jest-dom` ships with matchers that validate accessibility properties:

```tsx
describe("Accordion", () => {
  it("has correct ARIA attributes", async () => {
    const user = userEvent.setup();
    render(<Accordion title="FAQ" content="Answer here" />);

    const trigger = screen.getByRole("button", { name: /faq/i });
    const panel = screen.getByRole("region");

    // Panel starts collapsed
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();

    // Expand
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).toBeVisible();
  });
});
```

### Commonly used accessibility matchers

```tsx
// Element is visible to the user
expect(element).toBeVisible();

// Element has an accessible name (via aria-label, aria-labelledby, or label)
expect(element).toHaveAccessibleName("Close dialog");

// Element has an accessible description (via aria-describedby)
expect(element).toHaveAccessibleDescription("Closes the current dialog");

// Element has correct role
expect(element).toHaveRole("button");

// Element is enabled/disabled
expect(button).toBeEnabled();
expect(submitButton).toBeDisabled();

// Element has focus
expect(input).toHaveFocus();

// Check aria attributes directly
expect(element).toHaveAttribute("aria-expanded", "true");
expect(element).toHaveAttribute("aria-selected", "false");
```

### `jest-axe` integration

`jest-axe` runs the axe-core accessibility engine against your rendered output to catch
WCAG violations automatically.

```bash
npm install -D jest-axe @types/jest-axe
```

Setup in `jest.setup.ts`:

```ts
import "jest-axe/extend-expect";
```

```tsx
import { axe } from "jest-axe";
import { render } from "@testing-library/react";

describe("LoginForm accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<LoginForm />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no violations in error state", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoginForm />);

    // Submit empty form to trigger errors
    await user.click(screen.getByRole("button", { name: /log in/i }));

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
```

:::tip[Best Practice]
Add an `axe` accessibility check to at least one test per component. Focus on states where
accessibility is most likely to break: error states, loading states, expanded/collapsed states,
and modal dialogs. The `jest-axe` check catches issues like missing labels, insufficient
color contrast in inline styles, and invalid ARIA attribute usage.
:::

### Focus management testing

```tsx
describe("Modal", () => {
  it("traps focus within the modal", async () => {
    const user = userEvent.setup();
    render(<Modal isOpen title="Confirm">Are you sure?</Modal>);

    // Focus should be on the first focusable element
    expect(screen.getByRole("button", { name: /cancel/i })).toHaveFocus();

    // Tab to next element
    await user.tab();
    expect(screen.getByRole("button", { name: /confirm/i })).toHaveFocus();

    // Tab wraps back to first element
    await user.tab();
    expect(screen.getByRole("button", { name: /cancel/i })).toHaveFocus();
  });

  it("returns focus to trigger on close", async () => {
    const user = userEvent.setup();
    render(<ModalTrigger />);

    const openButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(openButton);

    expect(screen.getByRole("dialog")).toBeVisible();

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });
});
```

---

## Common Pitfalls

### `act()` warnings

The `act()` warning means a state update happened outside of React's test-aware batching. This
usually indicates an async operation completed after the test moved on.

**Common causes and fixes:**

```tsx
// PROBLEM: async state update finishes after assertion
it("loads data", () => {
  render(<DataLoader />);
  // Warning: state update not wrapped in act()
});

// FIX 1: wait for the loading to complete
it("loads data", async () => {
  render(<DataLoader />);
  await screen.findByText("Data loaded");
});

// FIX 2: wait for loading indicator to disappear
it("loads data", async () => {
  render(<DataLoader />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
});
```

```tsx
// PROBLEM: timer-based state update
it("shows notification then hides it", () => {
  jest.useFakeTimers();
  render(<Notification message="Saved!" duration={3000} />);

  expect(screen.getByText("Saved!")).toBeVisible();

  // Without act(), this causes a warning
  jest.advanceTimersByTime(3000);

  expect(screen.queryByText("Saved!")).not.toBeInTheDocument();
});

// FIX: wrap timer advancement in act()
it("shows notification then hides it", () => {
  jest.useFakeTimers();
  render(<Notification message="Saved!" duration={3000} />);

  expect(screen.getByText("Saved!")).toBeVisible();

  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(screen.queryByText("Saved!")).not.toBeInTheDocument();
  jest.useRealTimers();
});
```

:::caution
`act()` warnings are never harmless -- they mean your test does not accurately reflect what
the user sees. Do not suppress them with `jest.spyOn(console, 'error')`. Fix the root cause
by properly awaiting async operations or wrapping state updates.
:::

### Testing portals

Components that render into portals (modals, tooltips, dropdowns) render outside the component's
DOM tree but are still in the `document`. RTL queries search the entire `document` by default,
so most queries work without changes:

```tsx
describe("Tooltip", () => {
  it("renders tooltip content in a portal", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Helpful info"><button>Hover me</button></Tooltip>);

    await user.hover(screen.getByRole("button", { name: /hover me/i }));

    // This works even though the tooltip is in a portal
    expect(screen.getByText("Helpful info")).toBeVisible();
  });
});
```

If you need to scope queries to the portal container:

```tsx
it("renders in the portal container", async () => {
  const user = userEvent.setup();
  render(
    <>
      <div data-testid="portal-root" />
      <ModalWithPortal targetId="portal-root" isOpen>
        <p>Modal content</p>
      </ModalWithPortal>
    </>
  );

  const portalRoot = screen.getByTestId("portal-root");
  expect(within(portalRoot).getByText("Modal content")).toBeVisible();
});
```

:::caution
If your portal component creates its own DOM node (e.g., appending a `div` to `document.body`),
make sure to clean it up. RTL's `cleanup` unmounts the React tree but does not remove manually
appended DOM nodes. Add cleanup in `afterEach`:

```tsx
afterEach(() => {
  // Remove any portal containers left behind
  document.querySelectorAll("[data-portal]").forEach((el) => el.remove());
});
```

:::

### Cleanup and `afterEach`

RTL automatically calls `cleanup` after each test when using Jest (via `afterEach`). You
generally do not need to call it manually. But be aware of these cases:

```tsx
// RTL auto-cleanup handles this
it("test one", () => {
  render(<App />);
  // Unmounted automatically after this test
});

it("test two", () => {
  render(<App />);
  // Fresh DOM, no leaking from test one
});
```

If you disabled auto-cleanup (rare), call it manually:

```tsx
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

### State leaks between tests

State leaks happen when global or module-level state persists across tests. Common sources:

**Mock not reset:**

```tsx
// BAD: mock accumulates calls across tests
const mockFn = jest.fn();

describe("MyComponent", () => {
  it("test one", () => {
    mockFn("a");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("test two", () => {
    mockFn("b");
    // FAILS: mockFn has been called 2 times total
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

// FIX: reset mocks between tests
describe("MyComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test one", () => {
    mockFn("a");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("test two", () => {
    mockFn("b");
    expect(mockFn).toHaveBeenCalledTimes(1); // passes
  });
});
```

**Singleton store not reset:**

```tsx
// BAD: Zustand/Redux store retains state between tests
describe("Dashboard", () => {
  it("adds item to cart", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(screen.getByText("1 item")).toBeVisible();
  });

  it("shows empty cart", () => {
    // FAILS: cart still has 1 item from previous test
    render(<Dashboard />);
    expect(screen.getByText("0 items")).toBeVisible();
  });
});

// FIX: reset the store in beforeEach
beforeEach(() => {
  useCartStore.setState({ items: [] });
});
```

**Fake timers not restored:**

```tsx
// BAD: fake timers leak into the next test
it("test with timers", () => {
  jest.useFakeTimers();
  // ... test code ...
  // forgot to call jest.useRealTimers()
});

it("next test breaks", async () => {
  // setTimeout/setInterval behave unexpectedly
});

// FIX: always restore in afterEach
afterEach(() => {
  jest.useRealTimers();
});
```

:::tip[Best Practice]
Add these three lines to the top-level `describe` block (or globally in `jest.setup.ts`)
to prevent the most common state leaks:

```tsx
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});
```

`clearAllMocks` resets call counts and return values. `restoreAllMocks` restores the original
implementation of spied-on functions. Together they ensure a clean slate for every test.
:::
