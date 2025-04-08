import Layout from '@theme/Layout';
import { CountProvider, useCount } from '../../components/context/level01/counter-context'
import Link from '@docusaurus/Link';

const ShowCount = () => {
  const { count } = useCount()

  return (
    <div className="text-xl-bold">{count}</div>
  )
}

const IncrementCount = () => {
  const { count, setCount } = useCount()

  return (
    <button onClick={() => setCount(count + 1)}>Add One</button>
  )
}

export default function BasicContext(){

  return (
    <Layout>
      <div style={{ margin: '10px', maxWidth: '400px'}}>
        <Link to="/context">Back to Context Home</Link>
        <h1>Basic Context</h1>
        <CountProvider>
          <ShowCount />
          <IncrementCount />
        </CountProvider>
      </div>
    </Layout>
  )
}

