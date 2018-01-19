import { injectIntl } from 'react-intl'

export default Component => injectIntl(props => {
  props.intl.fm = (id, values) => {
    if (typeof props.intl.messages[id] === 'undefined') {
      props.intl.messages[id] = id
    }

    return props.intl.formatMessage({ id }, values)
  }

  return <Component {...props} />
})
