import { Layout } from 'antd'
import { APP_NAME } from '../../config'

export default () =>
  <Layout.Footer>
    <div className="container">
      {APP_NAME} &copy;{new Date().getFullYear()} All rights reserved
    </div>
  </Layout.Footer>
