import CustomLayout from '../CustomLayout'
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

const contextLinks = [
  { title: 'Basic Context', level: 1, link: '/context/basic-context', inProgress: false },
  { title: 'Guarded Context', level: 2, link: '/context/guarded-context', inProgress: false },
  { title: 'Split Context', level: 3, link: '/context/split-context', inProgress: false },
  { title: 'Context Factory', level: 5, link: '/context/context-factory', inProgress: true }
]

export const ContextLink = ({ index }: { index: number }) => {
  if (!contextLinks[index]) {
    throw new Error('No link for that index')
  }

  return (
    <>
      <Link to={contextLinks[index].link}>{contextLinks[index].title}</Link>
    </>
  )
}

/*
 * create new pages like guarded-context.tsx. Implement 
 * 
 */

export default function Context() {
  return (
    <CustomLayout>
      <h1>Context Home</h1>
      <div style={{ marginBottom: '10px' }}>
        <h3>Understanding This Work</h3>
        <div>
          <p>
            All files in the <code>/pages</code> directory need to be ReactNodes.
            The context pages all live under <code>/pages/context</code> but can
            import files, components, and context from <code>/components/context</code>.
            Next steps for this page are to create working examples of each of the levels
            articulated in the context section.
          </p>
        </div>
        <h3>Links</h3>
        {contextLinks.map((link) => {
          return (
            <div key={link.title}>
              <strong>Level {link.level}: </strong>
              <Link to={link.link}>{link.title}</Link>
              {link.inProgress ? (
                <span style={{ marginLeft: '4px' }}>(In Progress)</span>
              ) : null}
            </div>
          )
        })}
      </div>
      <div>
        <h3>Quick Discussion</h3>
        <p>
          If you look at the file for <ContextLink index={0} /> you can see that there
          are some red squigglies - TypeScript doesn't like it. The reason is that my
          context could be <code>null</code>. In level 2, we fix that.
        </p>
        <p>
          The file for <ContextLink index={1} /> looks quite similar to the first one (because
          TypeScript won't build the app if it's wrong) but it has a guard. This is a safe context
          usage.
        </p>
        <p>
          The <ContextLink index={2} /> is a good pattern. I've combined Levels 3 & 4 because Level 4
          is just Level 3 with safe reference to the context.
        </p>
        <p>
          The <ContextLink index={3} /> context is interesting. I like that it allows me to pretty quickly
          create a brand new context. Once you finish the factory, here is how I quickly spun up a new
          counter context:
        </p>
        <CodeBlock language="tsx" showLineNumbers>
          {`import { createSafeContext } from "./context-factory"
          
type CounterState = {
  count: number;
}
          
export const [FactoryCounterProvider, useCounter] = createSafeContext<CounterState>('Counter')`}
        </CodeBlock>
        <p>
          And then to use it, it's just like a custom context. I wrap my target component in the provider
          and then use my custom hook in the component that needs it.
        </p>
      </div>
    </CustomLayout>
  )
}