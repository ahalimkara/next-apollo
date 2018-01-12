import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

import resolvers from './resolvers'

import ApolloLogger from './ApolloLogger'
import { GRAPHQL_API } from '../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState, accessToken) {
  const cache = new InMemoryCache().restore(initialState || {})
  const stateLink = withClientState({ ...resolvers, cache })

  const authLink = setContext((_, { headers }) => {
    const token = process.browser ? Cookies.get('accessToken') : accessToken
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  const link = ApolloLink.from([new ApolloLogger(), stateLink, authLink, new HttpLink({
    uri: GRAPHQL_API, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  })])

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache,
  })
}

export default (initialState, accessToken) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, accessToken)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, accessToken)
  }

  return apolloClient
}
