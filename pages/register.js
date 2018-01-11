import { compose } from 'recompose'

import withData from '../src/app/withData'
import { guestPage } from '../src/app/auth'

import Layout from '../src/layouts/default'
import Register from '../src/pages/register'

const Page = props =>
  <Layout>
    <Register {...props} />
  </Layout>

const enhance = compose(
  withData,
  guestPage,
)

export default enhance(Page)
