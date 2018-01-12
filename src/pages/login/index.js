import Link from 'next/link'
import { withApollo } from 'react-apollo'
import { compose, withHandlers } from 'recompose'
import { Alert, Button, Card, Form } from 'antd'

import withLoginMutation from '../../data/mutation/login'

import { RequiredInput } from '../../components/form/Input'
import withMutations from '../../app/withMutations'
import { login } from '../../app/auth'
import redirect from '../../app/redirect'
import s from '../register/styles'
import { APP_NAME } from '../../config'

const onSuccess = (response, apollo) => {
  login(response.data.login.accessToken, apollo)
  redirect('/')
}

const onSubmit = props => (e) => {
  e.preventDefault()

  props.form.validateFields((err, values) => {
    if (!err && !props.loading) {
      props.login({ payload: values }, { onSuccess: r => onSuccess(r, props.client) })
    }
  })
}

const Login = ({ errors, loading, onSubmit, form: { getFieldDecorator } }) =>
  <div>
    <Link href="/">
      <a className={s.wrapClassName('f-title')}>{APP_NAME}</a>
    </Link>
    <Card title="Login" className={s.wrapClassName('f-form')}>

      {errors && errors.map((e, k) => <Alert message={e} key={k} type="error" style={{ marginBottom: '20px' }} />)}

      <Form onSubmit={onSubmit}>
        <RequiredInput id="email" type="email" icon="mail" placeholder="Email"
                       getFieldDecorator={getFieldDecorator} />
        <RequiredInput id="password" type="password" icon="lock" placeholder="Password"
                       getFieldDecorator={getFieldDecorator} />
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" loading={loading} size="large" htmlType="submit"
                  className={s.wrapClassName('f-button')}>
            Login
          </Button>
          Or <Link href="/register"><a>register now!</a></Link>
          <Link href="/password/reset">
            <a style={{ float: 'right' }}>Forgot password</a>
          </Link>
        </Form.Item>
      </Form>
    </Card>

    <s.styles />
  </div>

const enhance = compose(
  Form.create(),
  withApollo,
  withLoginMutation,
  withMutations({ mutations: ['login'] }),
  withHandlers({ onSubmit }),
)

export default enhance(Login)
