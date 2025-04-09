import ContextPageWrapper from '../../components/context/components/ContextPageWrapper'
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
    <ContextPageWrapper>
      <h1>Split Context</h1>
      <CounterProvider>
        <ComponentThatNeedsStateContext />
        <ComponentThatNeedsDispatchContext />
      </CounterProvider>
    </ContextPageWrapper>
  )
}