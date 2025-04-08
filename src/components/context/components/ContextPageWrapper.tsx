import CustomLayout from '../../../pages/CustomLayout'
import Link from '@docusaurus/Link';

export const ContextPageWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <CustomLayout>
      <Link to="/context">Back to Context Home</Link>
      {children}
    </CustomLayout>
  )
}

export default ContextPageWrapper;