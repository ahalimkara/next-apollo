import { Layout } from 'antd'
import T from '../../components/T'
import { APP_NAME } from '../../config'
import Locales from '../Locales'

export default () => (
  <Layout.Footer>
    <div className="container">
      {APP_NAME} &copy;{new Date().getFullYear()}{' '}
      <T m="All rights reserved" />{' '}
      <Locales onlyIcon={true} />
    </div>
    <style jsx>{`
      div {
        color: rgba(0, 0, 0, 0.4);
        font-size: 13px;
        text-align: center;
      }
    `}
    </style>
  </Layout.Footer>
)
