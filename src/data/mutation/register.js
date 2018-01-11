import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const mutation = gql`
    mutation register($name: String!, $payload: AuthProviderSignupData!, $login: AUTH_PROVIDER_EMAIL) {
        register: createUser(name: $name, authProvider: $payload) {
            id
        }
        login: signinUser(email: $login) {
            accessToken: token
        }
    }
`

export default graphql(mutation, { name: 'register' })
