
### Confirming Text is Present

- One pattern that I like is using RegExp combined with `getByText()`. Here's 
an example:

```js
const heading = new RegExp('welcome to the app', 'i');
expect(screen.getByText(heading)).toBeVisible();

// or
expect(screen.getByText(heading)).toBeInTheDocument();
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
