
### Confirming Text is Present

- One pattern that I like is using RegExp combined with `getByText()`. Here's 
an example:

```js
const heading = new RegExp('welcome to the app', 'i');
expect(screen.getByText(heading)).toBeVisible();

// or
expect(screen.getByText(heading)).toBeInTheDocument();
```

### Counting Elements in a Page

```js
it('should render four images', () => {
  render(<MyComponent />)
  const images = screen.getAllByRole('img')
  expect(images).toHaveLength(4)
})
```

### Confirming Text is NOT Present

- One pattern that I like is using RegExp combined with `queryByText()`. Here's
an example:

```js
const heading = new RegExp('welcome to the app', 'i');
expect(screen.queryByText(heading)).not.toBeInTheDocument();

// I should try this as well:
expect(screen.queryByText(heading)).toBeNull();
```

### Clicking a Button
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

### Mocking useNavigate from React Router

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
