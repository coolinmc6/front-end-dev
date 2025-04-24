import ContextLayout from './ContextLayout';
import { useState } from 'react'
import { FactoryCounterProvider, useCounter } from '../../components/context/level05/counter-context-l5'
import { CounterProvider as CounterProvider2, useCounter as useCounter2 } from '../../components/context/level05/counter-context-v2-l5'

const ComponentThatNeedsCounter = () => {
  const { count } = useCounter()

  return (
    <div>Count: {count}</div>
  )
}

const ComponentThatNeedsCounter2 = () => {
  const { count, setCount } = useCounter2()

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  return (
    <FactoryCounterProvider value={{ count }}>
      {children}
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </FactoryCounterProvider>
  )
}


export default function ContextFactory() {
  return (
    <ContextLayout title="Context Factory">
      <CounterProvider>
        <ComponentThatNeedsCounter />
      </CounterProvider>
      <CounterProvider2>
        <ComponentThatNeedsCounter2 />
      </CounterProvider2>
    </ContextLayout>
  );
}