import { Form, Icon, Input } from 'antd'
import withIntl from '../../app/withIntl'

const NormalInput = (props) => {
  const { id, icon, getFieldDecorator, decorator, ...passThroughProps } = props
  const prefix = icon && <Icon type={icon} style={{ color: 'rgba(0, 0, 0, .25)' }} />

  return <Form.Item>{
    getFieldDecorator(id, decorator)(<Input prefix={prefix} size="large" {...passThroughProps} />)
  }</Form.Item>
}

export const RequiredInput = withIntl(({ intl: { fm }, ...props }) =>
  <NormalInput decorator={{
    rules: [{
      required: true,
      message: fm('This field is required'),
    }],
  }} {...props} />
)

export default NormalInput
