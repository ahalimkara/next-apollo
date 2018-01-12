export default {
  defaults: {
    currentUser: null,
    email: null,
  },
  resolvers: {
    Mutation: {
      setCurrentUser: (_, { currentUser }, { cache }) => {
        cache.writeData({ data: { currentUser, __typename: 'User' } })
        return null
      },
      setEmail: (_, { email }, { cache }) => {
        cache.writeData({ data: { email } })
        return null
      },
    },
  },
}
