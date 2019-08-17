import { withRouter } from 'next/router'
import config from '../config'

const formatPath = (pathname, locale) => {
  pathname = pathname ?
    locale ? `/${locale}/${pathname.replace(/^\//, '')}` : pathname :
    locale ? `/${locale}` : ''

  return pathname.replace(/\/+$/, '')
}

const pathRegExp = new RegExp(`^(/(${config.AVAILABLE_LOCALES.join('|')}))?(/.*)?$`)

const localizedPath = (asPath, locale) => {
  locale = locale === config.DEFAULT_LOCALE ? '' : `/${locale}`

  let path = `${locale}${asPath.match(pathRegExp)[3] || ''}`

  if (path && path.indexOf('?') === -1) {
    path = path.replace(/\/+$/, '')
  }

  return path || '/'
}

const pathWithoutLocale = asPath => asPath.match(pathRegExp)[3] || ''

export const currentLocale = asPath => asPath.match(pathRegExp)[2] || config.DEFAULT_LOCALE

export const prependLocale = (asPath, target) => {
  const match = asPath.match(pathRegExp)
  const locale = match[2] && match[2] !== config.DEFAULT_LOCALE ? match[2] : ''
  let path

  if (typeof target === 'object') {
    path = formatPath(target.asPath, locale)

  } else if (typeof target === 'string') {
    path = formatPath(target, locale)
  }

  return path
}


export default Component => withRouter(({ router: { asPath }, ...props }) => {
  props.locale = {
    prependLocale: target => prependLocale(asPath, target),
    localizedPath: locale => localizedPath(asPath, locale),
    currentLocale: currentLocale(asPath),
    pathWithoutLocale: pathWithoutLocale(asPath),
  }

  return <Component {...props} />
})
