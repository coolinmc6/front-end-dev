import CustomLayout from '../CustomLayout'
import Link from '@docusaurus/Link';

const contextLinks = [
  { title: 'Basic Context', level: 1, link: '/context/basic-context', inProgress: false },
  { title: 'Guarded Context', level: 2, link: '/context/guarded-context', inProgress: true }
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
      </div>
    </CustomLayout>
  )
}