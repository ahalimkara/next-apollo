import { Layout } from 'antd'
import { APP_NAME } from '../../config'

export default () => (
  <Layout.Footer>
    <div className="container">
      {APP_NAME} &copy;{new Date().getFullYear()} All rights reserved
    </div>
    <style jsx>{`
      div {
        color: rgba(0, 0, 0, 0.4);
        font-size: 13px;
        text-align: center;
      }
    `}</style>
  </Layout.Footer>
)