import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const mutation = gql`
    mutation login($payload: AUTH_PROVIDER_EMAIL) {
        login: signinUser(email: $payload) {
            accessToken: token
        }
    }
`

export default graphql(mutation, { name: 'login' })
