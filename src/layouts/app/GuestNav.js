import { Menu } from 'antd'
import Link from '../../components/Link'
import T from '../../components/T'

import { menuStyles } from './styles'

export default () =>
  <Menu mode="horizontal" className={menuStyles.className}>
    <Menu.Item key="/login">
      <Link href="/login">
        <a><T m="Login" /></a>
      </Link>
    </Menu.Item>
    <Menu.Item key="/register">
      <Link href="/register">
        <a><T m="Register" /></a>
      </Link>
    </Menu.Item>
  </Menu>
