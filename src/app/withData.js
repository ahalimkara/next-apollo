import PropTypes from 'prop-types'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import { wrapDisplayName } from 'recompose'

import initApollo from './initApollo'

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = wrapDisplayName(ComposedComponent, 'WithData')

    static propTypes = {
      apolloState: PropTypes.object.isRequired
    }

    static async getInitialProps(ctx) {
      // Initial apolloState with apollo (empty)
      let apolloState = { apollo: { data: {} } }

      const accessToken = ctx.req && ctx.req.cookies && ctx.req.cookies.accessToken
      const apollo = initApollo({}, accessToken)

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx, apollo)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query
              }
            }
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('[GraphQL Error]: ', error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        apolloState = {
          apollo: {
            data: apollo.cache.extract()
          }
        }
      }

      return {
        apolloState,
        accessToken,
        ...composedInitialProps
      }
    }

    constructor(props) {
      super(props)
      this.apollo = initApollo(this.props.apolloState.apollo.data, props.accessToken)
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
