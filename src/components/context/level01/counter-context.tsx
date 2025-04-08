import { createContext, useContext, useState } from 'react'

type CountContext = {
  count: number;
  setCount: (num: number) => void
}

const CountContext = createContext<CountContext | null>(null)

export const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0)

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  )
}

// // ORIGINAL CODE
// export const useCount = () => useContext(CountContext)

// Needed to make TS Happy - above is the original Code
export const useCount = (): CountContext => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};