import { withApollo } from 'react-apollo'
import { compose, withHandlers } from 'recompose'
import { Alert, Button, Card, Form } from 'antd'

import T from '../../components/T'
import Link from '../../components/Link'
import withRegisterMutation from '../../data/mutation/register'

import { login } from '../../app/auth'
import withIntl from '../../app/withIntl'
import withMutations from '../../app/withMutations'
import { RequiredInput } from '../../components/form/Input'
import redirect from '../../app/redirect'
import s from './styles'
import { APP_NAME } from '../../config'

const onSuccess = (response, apollo) => {
  login(response.data.login.accessToken, apollo)
  redirect('/')
}

const onSubmit = props => e => {
  e.preventDefault()

  props.form.validateFieldsAndScroll({ first: true, force: true }, (error, values) => {
    if (!error && !props.loading) {
      if (values.password !== values.password_confirmation) {
        props.form.setFields({ password_confirmation: { errors: [new Error('Please confirm your password')] } })
      } else {
        const { email, password } = values
        const login = { email, password }
        props.register({
          name: values.name,
          payload: { email: login },
          login,
        }, { onSuccess: r => onSuccess(r, props.client) })
      }
    }
  })
}

const Register = ({ intl: { fm }, errors, loading, onSubmit, form: { getFieldDecorator } }) =>
  <div>
    <Link href="/">
      <a className={s.wrapClassName('f-title')}>{APP_NAME}</a>
    </Link>
    <Card title={fm('Register')} className={s.wrapClassName('f-form')}>

      {errors && errors.map((e, k) => <Alert message={e} key={k} type="error"
                                             style={{ marginBottom: '20px' }} />)}

      <Form onSubmit={onSubmit}>
        <RequiredInput id="name" icon="user" placeholder={fm('Email')}
                       getFieldDecorator={getFieldDecorator} />
        <RequiredInput id="email" type="email" icon="mail" placeholder={fm('Email')}
                       getFieldDecorator={getFieldDecorator} />
        <RequiredInput id="password" type="password" icon="lock"
                       placeholder={fm('Password')}
                       getFieldDecorator={getFieldDecorator} />
        <RequiredInput id="password_confirmation" type="password" icon="lock"
                       placeholder={fm('Confirm Password')}
                       getFieldDecorator={getFieldDecorator} />
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" loading={loading} size="large" htmlType="submit"
                  className={s.wrapClassName('f-button')}>
            <T m="Register" />
          </Button>
          <T m="Already have an account?" /> <Link href="/login"><a><T m="Login" /></a></Link>
        </Form.Item>
      </Form>
    </Card>

    <s.styles />
  </div>

const enhance = compose(
  Form.create(),
  withIntl,
  withApollo,
  withRegisterMutation,
  withMutations({ mutations: ['register'] }),
  withHandlers({ onSubmit }),
)

export default enhance(Register)
