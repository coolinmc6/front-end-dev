import { createSafeContext } from "./context-factory"

type CounterState = {
  count: number;
}

export const [FactoryCounterProvider, useCounter] = createSafeContext<CounterState>('Counter')