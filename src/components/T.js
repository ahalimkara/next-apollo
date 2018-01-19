import { injectIntl, FormattedMessage } from 'react-intl'

export default injectIntl(({ intl, m, ...props }) => {
  if (typeof intl.messages[m] === 'undefined') {
    intl.messages[m] = m
  }

  return <FormattedMessage id={m} {...props} />
})
