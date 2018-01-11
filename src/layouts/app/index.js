import { Layout } from 'antd'

import App from '../../app'
import Header from './Header'
import Footer from './Footer'

export default ({ children }) =>
  <App>
    <Header />

    <Layout.Content>
      <div className="container">
        {children}
      </div>
    </Layout.Content>

    <Footer />
  </App>
