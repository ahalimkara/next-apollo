import Router from 'next/router'
import { prependLocale } from './withLocale'

export default (target, { asPath, res } = {}) => {

  if (res) {
    target = prependLocale(asPath, target)
    res.writeHead(302, { Location: target })
    res.end()
    res.finished = true
  } else {
    Router.replace(target, prependLocale(Router.asPath, target))
  }
}
