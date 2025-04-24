import ContextLayout from './ContextLayout';
import { CountProvider, useCount } from '../../components/context/level01/counter-context'
import Link from '@docusaurus/Link';

const ShowCount = () => {
  const { count } = useCount()

  return (
    <div className="text-xl-bold text-2xl">{count}</div>
  )
}

const IncrementCount = () => {
  const { count, setCount } = useCount()

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      onClick={() => setCount(count + 1)}
    >
      Add One
    </button>
  )
}

export default function BasicContext() {
  return (
    <ContextLayout title="Basic Context">
      <CountProvider>
        <ShowCount />
        <IncrementCount />
      </CountProvider>
    </ContextLayout>
  )
}

