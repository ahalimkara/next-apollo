import React from 'react'

import { guestPage } from '../src/app/auth'

import Layout from '../src/layouts/default'
import Login from '../src/pages/login'

const Page = props =>
  <Layout>
    <Login {...props} />
  </Layout>

export default guestPage(Page)
