import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu } from 'antd'

import { compose, withHandlers } from 'recompose'
import { withApollo } from 'react-apollo'

import { logout } from '../../app/auth'
import redirect from '../../app/redirect'
import { menuStyles } from './styles'

const handleLogout = props => e => {
  logout(props.client)
  redirect('/login')
}

const AuthNav = ({ router: { pathname }, handleLogout }) =>
  <Menu mode="horizontal" selectedKeys={[pathname]} className={menuStyles.className}>
    <Menu.Item key="/profile">
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="/logout">
      <a onClick={handleLogout}>Logout</a>
    </Menu.Item>
  </Menu>

const enhance = compose(
  withApollo,
  withHandlers({ handleLogout }),
  withRouter,
)

export default enhance(AuthNav)
