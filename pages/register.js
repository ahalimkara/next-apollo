import React from 'react'

import { guestPage } from '../src/app/auth'

import Layout from '../src/layouts/default'
import Register from '../src/pages/register'

const Page = props =>
  <Layout>
    <Register {...props} />
  </Layout>

export default guestPage(Page)
