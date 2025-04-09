# Level 6: Context Factory + Reducer

```tsx
export function createReducerContext<State, Action>(
  reducer: React.Reducer<State, Action>,
  initialState: State
) {
  const StateContext = createContext<State | undefined>(undefined);
  const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

  const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useStateCtx = () => {
    const state = useContext(StateContext);
    if (!state) throw new Error('Missing StateContext');
    return state;
  };

  const useDispatchCtx = () => {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Missing DispatchContext');
    return dispatch;
  };

  return { Provider, useStateCtx, useDispatchCtx };
}
```