---
sidebar_position: 1
---

# Jest Favorites

## Quick Reference

### Rendering Items

#### Selecting Multiple Items

```ts
const menuGroup = screen.getByTestId("nav-group");
const menuItems = within(menuGroup).getAllByTestId("nav-item");
expect(menuItems).toHaveLength(3);
const [home, about, login] = within(menuGroup).getAllByTestId("nav-item");
```

#### Text is Present

```tsx
expect(screen.getByText(/this text is on the screen/i)).toBeVisible();
```

#### Text is Not Present

```tsx
expect(screen.queryByText("Goodbye World")).not.toBeInTheDocument();
```

### User Events

#### Clicking a Button

**Get by Button Text**

```tsx
await userEvent.click(screen.getByRole("button", { name: /do stuff/i }));
```

**Get By Test Id**

```tsx
await userEvent.click(screen.getByTestId("my-button"));
```

#### Entering Text into Textbox

```tsx
await userEvent.type(screen.getByRole("textbox", { name: /textbox/i }), "500");
```

## Rendering Items

### Confirming Text is Present

- One pattern that I like is using RegExp combined with `getByText()`. Here's
  an example:

```js
const heading = new RegExp("welcome to the app", "i");
expect(screen.getByText(heading)).toBeVisible();

// or
expect(screen.getByText(heading)).toBeInTheDocument();
```

### Confirming Text is NOT Present

- One pattern that I like is using RegExp combined with `queryByText()`. Here's
  an example:

```js
const heading = new RegExp("welcome to the app", "i");
expect(screen.queryByText(heading)).not.toBeInTheDocument();

// I should try this as well:
expect(screen.queryByText(heading)).toBeNull();
```

### Counting Elements in a Page

```js
it("should render four images", () => {
  render(<MyComponent />);
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(4);
});
```

```ts
const menuGroup = screen.getByTestId("nav-group");
const menuItems = within(menuGroup).getAllByTestId("nav-item");
expect(menuItems).toHaveLength(3);
const [home, about, login] = within(menuGroup).getAllByTestId("nav-item");
```

### Examining a Table

- I saw this piece of code and thought it was a super cool idea if I wanted to take a
  look at particular items within a table

```tsx
describe("Table", () => {
  it("table test", () => {
    // Coolest part
    const [firstRow, secondRow, thirdRow] = screen.getAllByRole("row");

    expect(
      within(firstRow).getByRole("columnheader", { name: "Header 1" })
    ).toBeVisible();
    expect(
      within(firstRow).getByRole("columnheader", { name: "Header 2" })
    ).toBeVisible();

    expect(
      within(secondRow).getByRole("rowheader", { name: "John Smith" })
    ).toBeVisible();
    expect(within(secondRow).getByRole("cell", { name: "25" })).toBeVisible();
    expect(
      within(secondRow).getByRole("button", { name: "Save" })
    ).toBeEnabled();

    expect(
      within(thirdRow).getByRole("rowheader", { name: "Bill Smith" })
    ).toBeVisible();
    expect(within(thirdRow).getByRole("cell", { name: "55" })).toBeVisible();
    expect(
      within(thirdRow).getByRole("button", { name: "Save" })
    ).toBeEnabled();
  });
});
```

## User Events

### Clicking a Button

- To test how a user clicks a button, you need to grab the button using one of the Jest
  selectors (or rather DOM Testing Library selectors) and then click it. Here's an example
  showing it broken out into two steps and a one step version:

```js
import userEvent from "@testing-library/user-event";

// two steps
const button = screen.getByRole("button", { name: /submit/i });
await userEvent.click(button);

// one step
await userEvent.click(screen.getByRole("button", { name: /submit/i }));
```

### Selecting a Dropdown (Div)

### Entering Text into Textbox

```tsx
await userEvent.type(screen.getByRole("textbox", { name: /amount/i }), "500");
```

### Using Act

Here are just a few examples:

```tsx
it('act example #1', () => {
  render(<WrappedComponent />)

  expect(screen.getByTestId(/welcome-screen/i)).toBeVisible()

  // Welcome screen is removed after about 5 seconds
  act(() => {
    jest.advanceTimersByTime(6000)
  })

  expect(
    screen.queryByTestId(/welcome-screen/i)
  ).not.toBeInTheDocument()
}}
```

- in the example below, my function `handlePageError` is modifying state so it must be wrapped in `act`:

```tsx
it("shows an error modal", () => {
  render(<TestContainer />);

  act(() => {
    handlePageError("Error message 404");
  });

  expect(screen.getByText(/An unexpected error has occurred./i)).toBeVisible();
  expect(screen.getByText(/404/i)).toBeVisible();
  expect(screen.getByText(/OK/i)).toBeVisible();
});
```

- In this example, I'm using my `setIsLoggedIn` function to update my global state which needs to be wrapped in `act`:

```tsx
it("should show different page on logout", async () => {
  act(() => setIsLoggedIn(true));

  render(<MyComponent />);

  expect(screen.getByText(/Welcome Back/i)).toBeVisible();

  act(() => setIsLoggedIn(false));

  expect(screen.getByText(/Login/i)).toBeVisible();
});
```

### Mocking useNavigate from React Router

:::tip[Be Aware]

While this code works, the preference is now actual navigation behavior. So instead of
mocking the navigation and verify that the mocked function is called with the right
parameters, we create a mini router and verify that we actually navigate to the "page".
See the

:::

```ts
// mock useNavigate
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockUseNavigate,
}));

describe("mytest", () => {
  it("should call useNavigate", () => {
    render(<MyComponent />);

    const buttonLink = await screen.findByRole("button", {
      name: /Home/i,
    });

    await userEvent.click(buttonLink);

    // assert with mockUseNavigate
    expect(mockUseNavigate).toHaveBeenCalledWith("/home");
  });
});
```

### Testing Navigation Without Mocks

```tsx
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <MyComponent />
    </div>
  );
};

const AccountPage = () => <div>Account Page</div>;
const AboutPage = () => <div>About Page</div>;
const LoginPage = () => <div>Login Page</div>;

const TestContainer = () => (
  <Routes>
    <Route element={<HomePage />} path="/" />
    <Route element={<AccountPage />} path={ROUTES.ACCOUNT} />
    <Route element={<AboutPage />} path={ROUTES.ABOUT} />
    <Route element={<LoginPage />} path={ROUTES.LOGIN} />
  </Routes>
);

describe("my tests", () => {
  it("navigates to account page when account button is clicked and user is logged in", async () => {
    const { userEvent } = render(<TestContainer />);

    expect(screen.getByText("Home Page")).toBeVisible();

    const accountButton = screen.getByRole("button", { name: /account/i });
    await userEvent.click(accountButton);

    expect(screen.getByText("Account Page")).toBeVisible();
    expect(screen.queryByText("Home Page")).not.toBeInTheDocument();
  });
});
```

## Miscellaneous Items

### MUI Password Fields

- There's an example MUI password form (sign-up and login) that simply
  cannot be found by Jest. I've tried a bunch of different ways like
  `getByRole('password')`, `getByLabelText('password')`, `getByPlaceholderText('password')`, etc. and they just don't work. Here is what I did - both the
  MUI component and then the Jest selector:

```tsx
// inputProps with the data-testid
<TextField
  required
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  autoComplete="new-password"
  inputProps={{ "data-testid": "password" }}
/>
```

```tsx
// password Jest selector
const password = screen.getByTestId("password");
```

## Common Issues

### Deep Dive: Multiple Selectors

There was an issue where an unrelated part of the code had a test failing as a result of my change.
It took a while to find the issue but here is a brief summary of what happened:

- **I removed a loading state from an early return**: there were two queries previously in that
  component; I moved the second to a child component to clean up the larger one. Previously, both
  queries had to be loaded to display anything - this was not the best UX because the second query
  was both slow and not relevant to most users...it was just a drag on performance
- **The test was failing to load something:** the issue was that the test, which worked before,
  suddenly stopped working. The piece of data that was failing to load didn't seem to have any
  relation to the data that I moved to the child component.
- **When I added the loading state back, it worked**: by adding the loading state back, it somehow
  allowed the test to work. That didn't seem right because the main component did NOT need any of the
  data from the child component's query. Something wasn't adding up.
- to troubleshoot this, we dug into the components in question - we seemed to have the correct state
  of the app, but it wasn't working.
- **Conclusion:** we saw that it WAS finding a button and something was getting clicked but not
  OUR button - the button we wanted. We noticed that the selector for Jest was too broad - it was
  using a Regex to search for a short string that ALSO existed in another button. So a button was
  being clicked but the WRONG button.
- We had to change this:

```tsx
const button = await screen.findByRole("button", {
  name: /text/i,
});
await userEvent.click(button);
```

- to this:

```tsx
const button = await screen.findByRole("button", {
  name: "Text",
});
await userEvent.click(button);
```

- now instead of looking for a button that had the string `"text"` in it, we wanted only the one button
  we wanted that matched this text and casing and only had `"Text"`. It worked

## Wish List

- `renderHook` - get some examples and understand how to use it
