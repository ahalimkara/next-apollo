export default {
  defaults: {
    user: null,
    email: null,
  },
  resolvers: {
    Mutation: {
      setUser: (_, { user }, { cache }) => {
        cache.writeData({ data: { user, __typename: 'User' } })
        return null
      },
      setEmail: (_, { email }, { cache }) => {
        cache.writeData({ data: { email } })
        return null
      },
    },
  },
}
