import { compose } from 'recompose'

import withData from '../src/app/withData'
import { guestPage } from '../src/app/auth'

import Layout from '../src/layouts/default'
import Login from '../src/pages/login'

const Page = props =>
  <Layout>
    <Login {...props} />
  </Layout>

const enhance = compose(
  withData,
  guestPage,
)

export default enhance(Page)
