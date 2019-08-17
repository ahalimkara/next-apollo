import React from 'react'

import { injectViewer } from '../src/app/auth'

import Layout from '../src/layouts/app'
import Home from '../src/pages/home'

const Page = () =>
  <Layout>
    <Home />
  </Layout>

export default injectViewer(Page)
