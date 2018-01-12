import css from 'styled-jsx/css'

import resolveStyles from '../../app/resolveScopedStyles'

const styles = css`
    .f-title {
      display: block;
      font-size: 20px;
      text-align: center;
      margin: 20px auto;
    }
    .f-form {
      max-width: 340px;
      margin-left: auto;
      margin-right: auto;
    }
    .f-button {
      text-transform: uppercase;
      width: 100%;
    }
`

export default resolveStyles(styles)
