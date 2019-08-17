import React from 'react'
import Cookies from 'js-cookie'

import redirect from './redirect'
import { query } from '../data/query/viewer'
// import { mutation } from '../data/mutation/revokeToken'

export const getViewer = apollo =>
  apollo
    .query({ query })
    .then(({ data }) => (data && data.viewer) || null)
    .catch(() => null)

export const login = async (token, apollo) => {
  Cookies.set('accessToken', token, { expires: 365 })
  await apollo.cache.reset()
}

export const logout = async (apollo) => {
  // await apollo.mutate({ mutation })
  Cookies.remove('accessToken')
  await apollo.cache.reset()
}

const checkViewer = (Component, auth = null, redirectTo = null) => {
  const Comp = props => <Component {...props} />

  Comp.getInitialProps = async (ctx) => {
    const { apolloClient: apollo } = ctx
    const viewer = await getViewer(apollo)

    if (redirectTo && Boolean(auth) === !viewer) {
      redirect(redirectTo, ctx)
      return {}
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
