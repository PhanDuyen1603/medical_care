import { Button, Form, Input } from 'antd';

const FormEducationInfo = (form) => {
  return (
    <>
      <div className="row">
        <Form.Item label="College" name="college">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <div className="col-6">
          <Form.Item label="degree" name="degree">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item label="completion year" name="completionYear">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Form.Item label="award" name="award">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item label="award year" name="awardYear">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
      </div>
      <Form.Item label="experience hospital name" name="experienceHospitalName">
        <Input placeholder="input placeholder" />
      </Form.Item>
    </>
  )
}

export default FormEducationInfo;