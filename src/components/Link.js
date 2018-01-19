import Link from 'next/link'

import withLocale from '../app/withLocale'

export default withLocale(({ locale: { prependLocale }, children, as, ...props }) => {

  if (!as) {
    props.as = prependLocale(props.href)
  }

  return (
    <Link {...props}>
      {children}
    </Link>
  )
})
