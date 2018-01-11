import { Form, Icon, Input } from 'antd'

const NormalInput = props => {
  const { id, icon, getFieldDecorator, decorator, ...passThroughProps } = props
  const prefix = icon && <Icon type={icon} style={{ color: 'rgba(0, 0, 0, .25)' }} />

  return <Form.Item>{getFieldDecorator(id, decorator)(
    <Input prefix={prefix} size="large" {...passThroughProps} />
  )}</Form.Item>
}

export const RequiredInput = props => {
  return <NormalInput decorator={{ rules: [{ required: true, message: 'This field is required' }] }} {...props} />
}

export default NormalInput