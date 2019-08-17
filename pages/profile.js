import React from 'react'

import { authPage } from '../src/app/auth'

import Layout from '../src/layouts/app'
import Profile from '../src/pages/profile'

const Page = props =>
  <Layout>
    <Profile {...props} />
  </Layout>

export default authPage(Page)
