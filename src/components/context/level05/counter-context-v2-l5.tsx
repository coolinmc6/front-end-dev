import { useState, type ReactNode } from 'react'
import { createSafeContext } from './context-factory'

type CounterContext = {
  count: number;
  setCount: (num: number) => void
}

const [FactoryCounterProvider, useCounter] = createSafeContext<CounterContext>('Counter')

const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0)

  return (
    <FactoryCounterProvider value={{ count, setCount }}>
      {children}
    </FactoryCounterProvider>
  )
}

export { CounterProvider, useCounter }