import { Layout } from 'antd'
import css from 'styled-jsx/css'

import resolveStyles from '../../app/resolveScopedStyles'

const headerStyles = css`
    .logo {
      float: left;
    }
    .nav-right {
      float: right;
    }
    .wrapper {
      background: #fff;
    }
`
const headerCompStyles = css`
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    padding: 0;
`
const menuCompStyles = css`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 62px;
    border-bottom: 0 none;
`
const StyledHeader = resolveStyles(headerCompStyles, Layout.Header)
const menuStyles = resolveStyles(menuCompStyles)

export { headerStyles, menuStyles, StyledHeader }
