import Cookies from 'js-cookie'

import redirect from './redirect'
import { query } from '../data/query/viewer'
// import { mutation } from '../data/mutation/revokeToken'

export const getViewer = (context, apollo) =>
  apollo
    .query({ query })
    .then(({ data }) => (data && data.viewer) || null)
    .catch(() => null)

export const login = async (token, apollo) => {
  Cookies.set('accessToken', token, { expires: 365 })
  await apollo.resetStore()
}

export const logout = async (apollo) => {
  // await apollo.mutate({ mutation })
  Cookies.remove('accessToken')
  await apollo.resetStore()
}

const checkViewer = (Component, auth = null, redirectTo = null) => {
  const Comp = props => <Component {...props} />

  Comp.getInitialProps = async (ctx, apollo) => {
    const viewer = await getViewer(ctx, apollo)

    if (redirectTo && Boolean(auth) === !viewer) {
      redirect(redirectTo, ctx)
    }

    let props = {}
    if (Component.getInitialProps) {
      props = Component.getInitialProps(ctx, apollo)
    }

    return { viewer, ...props }
  }

  return Comp
}

export const injectViewer = Component => checkViewer(Component)

export const authPage = (Component, { redirectTo = '/login' } = {}) => checkViewer(Component, true, redirectTo)

export const guestPage = (Component, { redirectTo = '/' } = {}) => checkViewer(Component, false, redirectTo)
