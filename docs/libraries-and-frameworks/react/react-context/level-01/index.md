# Level 1: Basic Context

The first "level" of React context is just `createContext` and `useContext` with no
safeguards. This is what it looks like like at its simplest:

```tsx
import { createContext, useContext, useState } from 'react';

const CountContext = createContext(null);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

export const useCount = () => useContext(CountContext);
```