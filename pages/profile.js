import { compose } from 'recompose'

import withData from '../src/app/withData'
import { authPage } from '../src/app/auth'

import Layout from '../src/layouts/app'
import Profile from '../src/pages/profile'

const Page = props =>
  <Layout>
    <Profile {...props} />
  </Layout>

const enhance = compose(
  withData,
  authPage,
)

export default enhance(Page)
