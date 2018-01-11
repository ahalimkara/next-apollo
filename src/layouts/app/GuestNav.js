import Link from 'next/link'
import { Menu } from 'antd'

import { menuStyles } from './styles'

export default () =>
  <Menu mode="horizontal" className={menuStyles.className}>
    <Menu.Item key="/login">
      <Link href="/login">
        <a>Login</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="/register">
      <Link href="/register">
        <a>Register</a>
      </Link>
    </Menu.Item>
  </Menu>