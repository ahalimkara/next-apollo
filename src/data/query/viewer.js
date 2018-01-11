import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const query = gql`
    query viewer {
        viewer: user {
            id
            name
            email
        }
    }
`

export default graphql(query, {
  props: ({ data: { viewer } }) => ({ viewer })
})