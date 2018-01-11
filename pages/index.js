import { compose } from 'recompose'

import withData from '../src/app/withData'
import { injectViewer } from '../src/app/auth'

import Layout from '../src/layouts/app'
import Home from '../src/pages/home'

const Page = () =>
  <Layout>
    <Home />
  </Layout>

const enhance = compose(
  withData,
  injectViewer,
)

export default enhance(Page)
