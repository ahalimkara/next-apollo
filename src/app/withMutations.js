import hoistNonReactStatic from 'hoist-non-react-statics'
import flatMap from 'lodash/flatMap'
import { wrapDisplayName } from 'recompose'

export default ({ mutations = ['mutate'], loading = 'loading', errors = 'errors' } = {}) =>
  SourceComponent => {
    class WithMutations extends React.Component {

      state = {
        loading: false,
        errors: [],
      }

      submit = (mutation, variables, { onError, onSuccess } = {}, event = null) => {
        event && event.preventDefault()

        this.setState({ loading: true, errors: [] })

        this.props[mutation]({ variables })
          .then((response) => {
            this.setState({ loading: false })

            if (onSuccess) {
              onSuccess(response)
            }
          })
          .catch((error) => {
            error.messages = flatMap(error.graphQLErrors, e => (e.validation && flatMap(e.validation)) || e.message)

            if (error.networkError && error.networkError.result && error.networkError.result.errors)
              error.messages = error.messages.concat(error.networkError.result.errors.map(e => e.message))

            this.setState({ loading: false, errors: error.messages })

            if (onError) {
              onError(error)
            }
          })
      }

      render() {
        let compProps = {
          [loading]: this.state.loading,
          [errors]: this.state.errors,
        }
        mutations.map(m => compProps[m] = (...args) => this.submit(m, ...args))

        return <SourceComponent {...this.props} {...compProps} />
      }
    }

    WithMutations.displayName = wrapDisplayName(SourceComponent, 'WithMutations')
    hoistNonReactStatic(WithMutations, SourceComponent)

    return WithMutations
  }