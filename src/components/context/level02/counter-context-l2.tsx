import { createContext, useContext, useState, type ReactNode } from 'react'

type CounterContext = {
  count: number
  setCount: (num: number) => void
}
const CounterContext = createContext<CounterContext | null>(null)

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0)

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  )
}

export const useCounter = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}

