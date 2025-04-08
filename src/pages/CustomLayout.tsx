import Layout from '@theme/Layout';

export default function CustomLayout({ children }: { children: React.ReactNode}){

  return (
    <Layout>
      <div style={{ padding: '8px', maxWidth: '1000px'}}>
        {children}
      </div>
    </Layout>
  )
}

