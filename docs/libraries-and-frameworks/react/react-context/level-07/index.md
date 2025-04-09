# Level 7: Context Selector Pattern

:::tip Heads Up

This code is really high-level and reaching the point where you'd just use Zustand or some other
state management library. You would probably not ever need to do this yourself and even if you could, 
you'd still want to use Zustand just because it is open source, has a team supporting it,
and most importantly, not just you!

Consider yourself warned.
:::

Start by building the context with a store

```tsx
// createSelectorContext.ts
import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useSyncExternalStore,
} from 'react';

type Store<T> = {
  getState: () => T;
  setState: (next: T) => void;
  subscribe: (listener: () => void) => () => void;
};

function createStore<T>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (next) => {
      if (Object.is(next, state)) return;
      state = next;
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function createSelectorContext<State, Actions>() {
  const StateContext = createContext<Store<State> | undefined>(undefined);
  const ActionsContext = createContext<Actions | undefined>(undefined);

  const useStateSelector = <Selected,>(
    selector: (state: State) => Selected
  ): Selected => {
    const store = useContext(StateContext);
    if (!store) throw new Error('Missing StateContext');

    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.getState())
    );
  };

  const useActions = (): Actions => {
    const actions = useContext(ActionsContext);
    if (!actions) throw new Error('Missing ActionsContext');
    return actions;
  };

  const Provider = ({
    children,
    initialState,
    actions,
  }: {
    initialState: State;
    actions: Actions;
    children: ReactNode;
  }) => {
    const storeRef = useRef(createStore(initialState));
    return (
      <StateContext.Provider value={storeRef.current}>
        <ActionsContext.Provider value={actions}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    );
  };

  return {
    Provider,
    useStateSelector,
    useActions,
  };
}
```

Create your context which uses your new context selector.

```tsx
// CounterContext.tsx
import { useCallback, useState } from 'react';
import { createSelectorContext } from './createSelectorContext';

type CounterState = { count: number };
type CounterActions = { increment: () => void; reset: () => void };

const { Provider, useStateSelector, useActions } =
  createSelectorContext<CounterState, CounterActions>();

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const state: CounterState = { count };

  const actions: CounterActions = {
    increment: () => setCount(c => c + 1),
    reset: () => setCount(0),
  };

  return (
    <Provider initialState={state} actions={actions}>
      {children}
    </Provider>
  );
}

export { CounterProvider, useStateSelector as useCounterState, useActions as useCounterActions };
```
Finally, use it in a component:

```tsx
function CountDisplay() {
  const count = useCounterState(s => s.count);
  return <div>Count: {count}</div>;
}

function IncrementButton() {
  const { increment } = useCounterActions();
  return <button onClick={increment}>Increment</button>;
}
```