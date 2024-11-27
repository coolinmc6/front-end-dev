---
sidebar_position: 1
---

# Jest Favorites

## Next Steps

- renderHook => need some examples

## Confirming Text is Present

- One pattern that I like is using RegExp combined with `getByText()`. Here's 
an example:

```js
const heading = new RegExp('welcome to the app', 'i');
expect(screen.getByText(heading)).toBeVisible();

// or
expect(screen.getByText(heading)).toBeInTheDocument();
```

## Counting Elements in a Page

```js
it('should render four images', () => {
  render(<MyComponent />)
  const images = screen.getAllByRole('img')
  expect(images).toHaveLength(4)
})
```

## Confirming Text is NOT Present

- One pattern that I like is using RegExp combined with `queryByText()`. Here's
an example:

```js
const heading = new RegExp('welcome to the app', 'i');
expect(screen.queryByText(heading)).not.toBeInTheDocument();

// I should try this as well:
expect(screen.queryByText(heading)).toBeNull();
```

## Examining a Table
- I saw this piece of code and thought it was a super cool idea if I wanted to take a
look at particular items within a table

```tsx
describe('Table', () => {
  it('table test', () => {
    // Coolest part
    const [firstRow, secondRow, thirdRow] = screen.getAllByRole('row')

    expect(
      within(firstRow).getByRole('columnheader', { name: 'Header 1' })
    ).toBeVisible()
    expect(
      within(firstRow).getByRole('columnheader', { name: 'Header 2' })
    ).toBeVisible()

    expect(
      within(secondRow).getByRole('rowheader', { name: 'John Smith' })
    ).toBeVisible()
    expect(within(secondRow).getByRole('cell', { name: '25' })).toBeVisible()
    expect(
      within(secondRow).getByRole('button', { name: 'Save' })
    ).toBeEnabled()

    expect(
      within(thirdRow).getByRole('rowheader', { name: 'Bill Smith' })
    ).toBeVisible()
    expect(within(thirdRow).getByRole('cell', { name: '55' })).toBeVisible()
    expect(within(thirdRow).getByRole('button', { name: 'Save' })).toBeEnabled()
  })
})
```

## Clicking a Button
- To test how a user clicks a button, you need to grab the button using one of the Jest
selectors (or rather DOM Testing Library selectors) and then click it. Here's an example
showing it broken out into two steps and a one step version:

```js
import userEvent from '@testing-library/user-event'

// two steps
const button = screen.getByRole('button', { name: /submit/i });
await userEvent.click(button);

// one step
await userEvent.click(screen.getByRole('button', { name: /submit/i }));
```

## Using Act

Here are just a few examples:

```ts
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
```ts
it('shows an error modal', () => {
  render(<TestContainer />)

  act(() => {
    handlePageError('Error message 404')
  })

  expect(
    screen.getByText(
      /An unexpected error has occurred./i
    )
  ).toBeVisible()
  expect(screen.getByText(/404/i)).toBeVisible()
  expect(screen.getByText(/OK/i)).toBeVisible()
})
```

- In this example, I'm using my `setIsLoggedIn` function to update my global state which needs to be wrapped in `act`:
```ts
it('should show different page on logout', async () => {
  act(() => setIsLoggedIn(true))

  render(<MyComponent />)

  expect(screen.getByText(/Welcome Back/i)).toBeVisible()

  act(() => setIsLoggedIn(false))

  expect(screen.getByText(/Login/i)).toBeVisible()
})
```



## Mocking useNavigate from React Router

```ts
// mock useNavigate
const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
}))

describe('mytest', () => {
  it('should call useNavigate', () => {
    render(<MyComponent />)

    const buttonLink = await screen.findByRole('button', {
      name: /Home/i,
    })

    await userEvent.click(buttonLink)

    // assert with mockUseNavigate
    expect(mockUseNavigate).toHaveBeenCalledWith('/home')
  })
})
```

## MUI Password Fields

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
const password = screen.getByTestId('password')
```