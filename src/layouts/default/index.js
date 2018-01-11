import { Layout } from 'antd'

import App from '../../app'
import Footer from './Footer'

export default ({ children }) =>
  <App>
    <Layout.Content>
      <div className="container">
        {children}
      </div>
    </Layout.Content>

    <Footer />
  </App>