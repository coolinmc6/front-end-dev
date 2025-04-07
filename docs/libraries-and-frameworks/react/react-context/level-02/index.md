# Level 2: Guarded Context

This builds off of #1 by adding a custom hook to guard against a missing Provider.
The code is very similar:

```tsx
import { createContext, useContext, useState } from 'react';

const CountContext = createContext(undefined);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  const context = useContext(CountContext);
  if (!context) throw new Error('useCount must be used within a CountProvider');
  return context;
}
```