# Level 9: Ultimate + DevTools

:::tip Heads Up

This code is really high-level and reaching the point where you'd just use Zustand or some other
state management library. You would probably not ever need to do this yourself and even if you could, 
you'd still want to use Zustand just because it is open source, has a team supporting it,
and most importantly, not just you!

Consider yourself warned.
:::

## Build the Ultimate Context with Logger

```tsx
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

type DevtoolsHook<State> = (state: State) => void;

export function createUltimateContext<State, Actions = undefined>(options: {
  displayName: string;
  reducer?: React.Reducer<State, any>;
  initialState?: State;
  devtools?: DevtoolsHook<State>;    // optional custom log function
  enableLogger?: boolean;            // simple console.log fallback
}) {
  const StateContext = createContext<State | undefined>(undefined);
  const ActionsContext = createContext<any>(undefined); // Actions or Dispatch

  StateContext.displayName = `${options.displayName}State`;
  ActionsContext.displayName = `${options.displayName}Actions`;

  const useState = () => {
    const context = useContext(StateContext);
    if (!context) {
      throw new Error(`[${options.displayName}] Missing State Provider`);
    }
    return context;
  };

  const useActions = (): Actions extends undefined ? Dispatch<any> : Actions => {
    const context = useContext(ActionsContext);
    if (!context) {
      throw new Error(`[${options.displayName}] Missing Actions Provider`);
    }
    return context;
  };

  const Provider = (props: any) => {
    if (options.reducer) {
      const [state, dispatch] = useReducer(options.reducer, options.initialState!);

      if (options.devtools) {
        options.devtools(state);
      } else if (options.enableLogger) {
        console.log(`[${options.displayName}]`, state);
      }

      return (
        <StateContext.Provider value={state}>
          <ActionsContext.Provider value={dispatch}>
            {props.children}
          </ActionsContext.Provider>
        </StateContext.Provider>
      );
    }

    // Manual state + actions pattern
    const { state, actions, children } = props;

    if (options.devtools) {
      options.devtools(state);
    } else if (options.enableLogger) {
      console.log(`[${options.displayName}]`, state);
    }

    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    );
  };

  return {
    Provider,
    useState,
    useActions,
  };
}
```

## Quick `console.log()` Support (no setup)

```tsx
const {
  Provider: CounterProvider,
  useState: useCounterState,
  useActions: useCounterDispatch,
} = createUltimateContext({
  displayName: 'Counter',
  reducer: (state, action) => {
    switch (action.type) {
      case 'inc':
        return { count: state.count + 1 };
      case 'reset':
        return { count: 0 };
      default:
        return state;
    }
  },
  initialState: { count: 0 },
  enableLogger: true, // ✅ logs on every state update
});
```

## Custom Logging

```tsx
const {
  Provider: AuthProvider,
  useState: useAuthState,
  useActions: useAuthActions,
} = createUltimateContext({
  displayName: 'Auth',
  initialState: { user: null },
  devtools: (state) => {
    console.log('%c[Auth Devtools]', 'color: green', state);
  },
});
```

## Example Implementation

### Create your Context

```tsx
// CounterContext.tsx
import { createUltimateContext } from './createUltimateContext';

type CounterState = {
  count: number;
};

type CounterAction =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'reset' };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
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
} = createUltimateContext<CounterState>({
  displayName: 'Counter',
  reducer: counterReducer,
  initialState: { count: 0 },
  enableLogger: true, // ✅ Console logs on each state update
});

export { CounterProvider, useCounterState, useCounterDispatch };
```

### Wrap Target Component in Provider

```tsx
import { CounterProvider } from './CounterContext';
import { Counter } from './Counter';

export function ParentComponent() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
```

### Use it in a component

```tsx
// Counter.tsx
import { useCounterState, useCounterDispatch } from './CounterContext';

export function Counter() {
  const { count } = useCounterState();
  const dispatch = useCounterDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```