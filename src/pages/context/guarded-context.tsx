import ContextLayout from './ContextLayout';
import { CounterProvider, useCounter } from '../../components/context/level02/counter-context-l2'

const ComponentThatNeedsContext = () => {
  const { count, setCount } = useCounter()

  return (
    <div>
      <div>Total: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

export default function GuardedContext() {
  return (
    <ContextLayout title="Guarded Context">
      <CounterProvider>
        <ComponentThatNeedsContext />
      </CounterProvider>
    </ContextLayout>
  )
}