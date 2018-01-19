import { Layout } from 'antd'
import { APP_NAME } from '../../config'
import Locales from '../Locales'
import T from '../../components/T'

export default () =>
  <Layout.Footer>
    <div className="container">
      {APP_NAME} &copy;{new Date().getFullYear()} <T m="All rights reserved" />

      <div style={{ float: 'right' }}>
        <Locales />
      </div>
    </div>
  </Layout.Footer>
