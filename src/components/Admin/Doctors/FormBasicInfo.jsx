import { Form, Input, Select, InputNumber } from 'antd';
import { doctorSpecialistArray } from '@/constant/global'

const FormBasicInfo = ({ submitType = 'create' }) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input disabled={submitType === 'update'} />
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Please input phone number!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>

      <div className="row">
        <div className="col-6">
          <Form.Item
            label="Specialist"
            name="services"
            rules={[
              {
                required: true,
                message: 'Please select specialist!',
              },
            ]}
          >
            <Select>
              {
                doctorSpecialistArray.map((x, index) => (
                  <Select.Option value={x.value} key={`select_${index}`}>{x.value}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item name="price" label="Price">
            <InputNumber min={100} />
          </Form.Item>
        </div>
      </div>

    </>
  )
}

export default FormBasicInfo;