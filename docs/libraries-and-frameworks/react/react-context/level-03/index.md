# Level 3: Split Context

In Level 3, we are separating `state` from `actions`. And while this is a pretty
simple example, it already at least *looks* a bit more complicated because we
now have two providers.

```tsx
const StateContext = createContext(undefined);
const ActionsContext = createContext(undefined);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <StateContext.Provider value={{ count }}>
      <ActionsContext.Provider value={{ increment: () => setCount(c => c + 1) }}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
}

export const useCountState = () => useContext(StateContext);
export const useCountActions = () => useContext(ActionsContext);
```