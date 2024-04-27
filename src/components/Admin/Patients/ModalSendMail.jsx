import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Form, Input, Button } from "antd";
import { useSendMailMutation } from "@/redux/api/mailApi"

const { TextArea } = Input;

const ModalSendMail = ({ showModal, setShowModal, data }) => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    message: '',
  });
  const [form] = Form.useForm();

  const [sendEmail, { isSuccess, isError, error }] = useSendMailMutation()

  const handleClose = () => setShowModal(false)

  const onFinish = () => {
    console.log({ 11111: 121212 })
    const sendingData = {
      ...initialValues,
      email: data?.email
    }
    sendEmail({ data: sendingData })
    form.resetFields()
    setShowModal(false)
  }

  const onFieldsChange = (changedFields, allFields) => {
    const field = changedFields[0].name[0]
    const value = changedFields[0].value
    setInitialValues({ ...initialValues, [field]: value });
  }
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <div className='modal-doctor'>
          <Modal.Header closeButton>
            <Modal.Title>Sending mail</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className="row">
              <div className="col-12">
                <h5>To: {data?.email}</h5>
                <Form
                  style={{
                    maxWidth: 600,
                  }}
                  form={form}
                  onFinish={onFinish}
                  onFieldsChange={onFieldsChange}
                >
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Message"
                    name="message"
                  >
                    <TextArea />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Send</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  )
}

export default ModalSendMail;