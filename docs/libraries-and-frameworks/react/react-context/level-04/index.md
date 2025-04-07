# Level 4: Safe Split Context

Level 4 is just like level 2 with the guard and custom hook except we're doing it
for both contexts. Levels 3 and 4 are probably blurred into one level if we accept
the best (or at least *better*) practice of checking if context is present.

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

export function useCountState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useCountState must be used within CountProvider');
  return context;
}

export function useCountActions() {
  const context = useContext(ActionsContext);
  if (!context) throw new Error('useCountActions must be used within CountProvider');
  return context;
}
```

