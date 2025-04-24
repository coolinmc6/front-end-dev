# Recipes

The goal of this page is to have some of my favorite recipes in React that can be
copy-pasted as a good baseline.

## Context

```tsx
import { createContext, type ReactNode, useContext } from 'react';

type ContextValue = any; 

const YourContext = createContext<ContextValue | null>(null);

export const useYourContext = () => {
  const context = useContext(YourContext);

  if (!context) {
    throw new Error('Cannot use YourContext outside of a YourContextProvider');
  }

  return context;
};

type YourContextProviderProps = {
  children: ReactNode;
  value: ContextValue;
};

export const YourContextProvider = ({
  children,
  value,
}: YourContextProviderProps) => {
  return <YourContext value={value}>{children}</YourContext>;
};
```

1. Simplified Context Consumption
   - Encapsulation with a custom hook eliminates the need to directly import and use `useContext`.
   - Developers can simply call `useYourContext()` instead of `useContext(YourContext)`.

2. Error Handling Built-In
   - The custom hook includes a guard to ensure the context is used within its provider.
   - Prevents runtime errors caused by accessing a context outside its intended scope.

3. Co-location of Provider and Hook
   - Both `YourContextProvider` and `useYourContext` are defined in the same module.
   - Simplifies setup and ensures consistency across the codebase.

4. Cleaner Component Code
   - Components using the context don’t need to import both the `YourContext` and `useContext`.
   - Reduces coupling and improves maintainability.

5. Flexible and Reusable
   - The pattern supports any type of context value, from simple data to complex objects or functions.
   - Can be adapted to a wide variety of use cases.

6. React 19-Ready
   - Simplifies provider setup by using React 19’s `<Context value={}>` syntax instead of `.Provider`.

7. Improved Readability
   - Clearly defines where the context is provided (`YourContextProvider`) and how it’s consumed (`useYourContext`).
   - Makes it easier to reason about data flow in the component tree.

8. Developer Convenience
   - The hook provides easy access to the context without requiring additional imports or boilerplate.
   - The inclusion of the provider makes the API intuitive and self-contained.

[[↑] Back to top](#top)