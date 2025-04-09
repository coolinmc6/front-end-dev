# Level 8: Ultimate Context Factory

:::tip Heads Up

This code is really high-level and reaching the point where you'd just use Zustand or some other
state management library. You would probably not ever need to do this yourself and even if you could, 
you'd still want to use Zustand just because it is open source, has a team supporting it,
and most importantly, not just you!

Consider yourself warned.
:::

## Create your factory

```tsx
import {
  createContext,
  useContext,
  useReducer,
  useRef,
  ReactNode,
  Dispatch,
} from 'react';

export function createUltimateContext<State, Actions = undefined>(options: {
  displayName: string;
  reducer?: React.Reducer<State, any>;
  initialState?: State;
  devtools?: (state: State) => void;
}) {
  const StateContext = createContext<State | undefined>(undefined);
  const ActionsContext = createContext<any>(undefined); // Dispatch or Actions

  StateContext.displayName = `${options.displayName}State`;
  ActionsContext.displayName = `${options.displayName}Actions`;

  function useState() {
    const ctx = useContext(StateContext);
    if (ctx === undefined) throw new Error(`Missing ${options.displayName}State.Provider`);
    return ctx;
  }

  function useActions(): Actions extends undefined ? Dispatch<any> : Actions {
    const ctx = useContext(ActionsContext);
    if (ctx === undefined) throw new Error(`Missing ${options.displayName}Actions.Provider`);
    return ctx;
  }

  function Provider(props: any) {
    if (options.reducer) {
      const [state, dispatch] = useReducer(options.reducer, options.initialState!);
      options.devtools?.(state);
      return (
        <StateContext.Provider value={state}>
          <ActionsContext.Provider value={dispatch}>
            {props.children}
          </ActionsContext.Provider>
        </StateContext.Provider>
      );
    }

    // fallback: manually managed state + actions
    const { state, actions, children } = props;
    options.devtools?.(state);
    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    );
  }

  return {
    Provider,
    useState,
    useActions,
  };
}
```

## Example 1: Use as Context with Reducer

```tsx
// CounterContext.tsx
import { createUltimateContext } from './createUltimateContext';

type State = { count: number };
type Action = { type: 'inc' } | { type: 'reset' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

const {
  Provider: CounterProvider,
  useState: useCounterState,
  useActions: useCounterDispatch,
} = createUltimateContext<State>({
  displayName: 'Counter',
  reducer,
  initialState: { count: 0 },
});
```

## Example 2: Use State and Actions Manually

```tsx
const {
  Provider: CounterProvider,
  useState: useCounterState,
  useActions: useCounterActions,
} = createUltimateContext<{ count: number }, { increment: () => void }>({
  displayName: 'Counter',
});

export function MyCounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const state = { count };
  const actions = {
    increment: () => setCount(c => c + 1),
  };

  return <CounterProvider state={state} actions={actions}>{children}</CounterProvider>;
}
```

## Use it in a component

```tsx
function Counter() {
  const { count } = useCounterState();
  const dispatch = useCounterDispatch();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
    </>
  );
}

// Or with manual action
function Counter() {
  const { count } = useCounterState();
  const { increment } = useCounterActions();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => increment()}>+</button>
    </>
  );
}
```

