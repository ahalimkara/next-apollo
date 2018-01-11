import Link from 'next/link'

import GuestNav from './GuestNav'
import AuthNav from './AuthNav'

import { APP_NAME } from '../../config'
import withViewer from '../../data/query/viewer'
import { menuStyles, headerStyles, StyledHeader } from './styles'

const Header = ({ viewer }) =>
  <StyledHeader>
    <div className="wrapper container">
      <div className="logo">
        <Link href="/">
          <a>{APP_NAME}</a>
        </Link>
      </div>
      <div className="nav-right">
        {!viewer && <GuestNav />}
        {viewer && <AuthNav viewer={viewer} />}
      </div>
    </div>

    <menuStyles.styles />
    <style jsx>{headerStyles}</style>
  </StyledHeader>

export default withViewer(Header)


// const SET_VIEWER_MUTATION = gql`
//     mutation setUser($user: User!) {
//         setUser(user: $user) @client
//     }
// `
//
// export default compose(
//   graphql(gql`{ user @client }`, {
//     props: ({ ownProps, data: { user } }) => ({ user }),
//   }),
//   graphql(SET_VIEWER_MUTATION, {
//     props: ({ mutate, ownProps: { user }, ...rest }) => {
//       console.log(rest)
//       return { setUser: () => mutate({ variables: { user } }) }
//     },
//   }),
// )(Header)
