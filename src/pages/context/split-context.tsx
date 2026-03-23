import PagesLayout from '../PagesLayout';
import { CounterProvider, useCounterDispatch, useCounterState } from '../../components/context/level03/counter-context-l3'


const ComponentThatNeedsStateContext = () => {
  const { count } = useCounterState()

  return (
    <div>Count: {count}</div>
  )
}

const ComponentThatNeedsDispatchContext = () => {
  const { setCount } = useCounterDispatch()
  const { count } = useCounterState()

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default function SplitContext() {
  return (
    <PagesLayout title="Split Context">
      <CounterProvider>
        <ComponentThatNeedsStateContext />
        <ComponentThatNeedsDispatchContext />
      </CounterProvider>
    </PagesLayout>
  )
}