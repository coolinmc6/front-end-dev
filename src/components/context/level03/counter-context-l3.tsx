import { useContext, createContext, type ReactNode, useState } from 'react'

type CounterState = {
  count: number;
}

const CounterState = createContext<CounterState | null>(null)

type CounterDispatch = {
  setCount: (num: number) => void
}
const CounterDispatch = createContext<CounterDispatch | null>(null)

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0)

  return (
    <CounterState.Provider value={{ count }}>
      <CounterDispatch.Provider value={{ setCount }}>
        {children}
      </CounterDispatch.Provider>
    </CounterState.Provider>
  )
}

export const useCounterState = () => {
  const context = useContext(CounterState)
  if (!context) {
    throw new Error('Must use CounterState context within a Provider')
  }
  return context
}

export const useCounterDispatch = () => {
  const context = useContext(CounterDispatch)
  if (!context) {
    throw new Error('Must use CounterDispatch context within a Provider')
  }
  return context
}