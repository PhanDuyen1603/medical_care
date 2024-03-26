import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout'
import { Table, Space, Button, Form, Steps, Popover, message } from 'antd';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import FormEducationInfo from './FormEducationInfo';
import FormBasicInfo from './FormBasicInfo';
import useSearchColumn from '@/components/common/antd/useSearchColumn'
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';
import { useDoctorSignUpMutation, usePatientSignUpMutation } from '@/redux/api/authApi';
import { useUpdateDoctorMutation } from '@/redux/api/doctorApi';
import './Doctors.css';

const initData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  price: 0,
  college: '',
  degree: '',
  completionYear: '',
  award: '',
  awardYear: '',
  experienceHospitalName: '',
}
const keys = Object.keys(initData)

const transformData = (data) => {
  return data?.map((item) => {
    return {
      ...item,
      fullName: `${item.firstName} ${item.lastName}`
    };
  }) || []
}

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const Doctors = () => {
  const [showModal, setShowModal] = useState(false)
  const [submitType, setSubmitType] = useState('create')
  const [current, setCurrent] = useState(0);
  const [initialValues, setInitialValues] = useState(initData);
  // use api
  const [doctorCreate, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useDoctorSignUpMutation();
  const [updateDoctor, { isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = useUpdateDoctorMutation()

  const query = {};
  const [form] = Form.useForm();

  // modal
  const handleShow = (type = 'create') => {
    setShowModal(true)
    setSubmitType(type)
  }
  const handleClose = () => {
    setShowModal(false)

    form.resetFields();
    setInitialValues(initData)
  }

  // table
  const listActions = (data, record) => {
    const onDelete = () => {
      console.log('delete')
    }
    // TODO: flow when click update button is clicked
    const onUpdate = () => {
      handleShow('update')
      const updateData = Object.assign({}, ...keys.map(key => ({ [key]: initialValues[key] || data[key] })))
      setInitialValues({ ...updateData, id: data.id })
    }
    return (
      <Space size="middle">
        <a className='btn-circle' onClick={onUpdate}><EditOutlined /></a>
        <a className='btn-circle' onClick={onDelete}><DeleteOutlined /></a>
      </Space>
    )
  }
  const { getColumnSearchProps } = useSearchColumn()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '30%',
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Specialist',
      dataIndex: 'services',
      key: 'services',
      ...getColumnSearchProps('services'),
      sorter: (a, b) => a.services?.length - b.services?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      ...getColumnSearchProps('degree'),
      sorter: (a, b) => a.degree?.length - b.degree?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => listActions(_, record),
    },
  ];
  const { data: doctorData, isLoading, isError } = useGetDoctorsQuery({ ...query })
  const doctors = doctorData?.doctors;
  // end table

  // form 
  const next = () => { setCurrent(current + 1) };
  const prev = () => { setCurrent(current - 1) };
  const onStepChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  }
  const steps = [
    {
      title: 'profile',
    },
    {
      title: 'education',
    },
  ]
  const onFinish = (type = 'create') => {
    // TODO: sumbit
    if (submitType === 'create') {
      doctorCreate({ ...initialValues, price: initialValues.price ? initialValues.price + '' : '' });
    } else if (submitType === 'update') {
      updateDoctor({ id: initialValues.id, data: initialValues })
    }
  }
  const onFieldsChange = (changedFields, allFields) => {
    const field = changedFields[0].name[0]
    const value = changedFields[0].value
    setInitialValues({ ...initialValues, [field]: value });
  }

  useEffect(() => {
    if (dIsError && dError) {
      message.error("Email Already Exist !!")
    }

    if (!dIsError && dIsSuccess) {
      handleClose()
      swal({
        icon: 'success',
        text: `Successfully Doctor Created, Please Verify email`,
        timer: 5000
      })
    }

    if (!updateIsError && updateSuccess) {
      handleClose()
      swal({
        icon: 'success',
        text: `Successfully Doctor Updated`,
        timer: 5000
      })
    }
  })

  // useEffect(() => {
  //   if()
  //   form.resetFields();
  //   setInitialValues(initData)
  // }, [showModal])

  return (
    <>
      <AdminLayout >
        <button className='btn btn-primary' onClick={() => handleShow('create')}>
          <PlusOutlined />
        </button>
        <Table
          columns={columns}
          dataSource={transformData(doctors)}
          loading={isLoading}
        />
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <div className='modal-doctor'>
            <Modal.Header closeButton>
              <Modal.Title>Doctor create</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div className="row">
                <div className="col-12">
                  <h5>Basic information</h5>

                  <div className="row">
                    <div className="col-3">
                      <Steps current={current} direction="vertical" progressDot={customDot} onChange={onStepChange}>
                        <Steps.Step key={0} title="profile" />
                        <Steps.Step key={1} title="education" />
                        {/* <Steps.Step key={2} title="Success" /> */}
                      </Steps>
                    </div>
                    <div className="col-9">
                      <Form
                        layout='vertical'
                        form={form}
                        initialValues={initialValues}
                        className='custom-form mb-5 mt-3 mx-1'
                        onFinish={onFinish}
                        onFieldsChange={onFieldsChange}
                      >
                        <div className='col-12'>
                          {current === 0 && (
                            <FormBasicInfo
                              submitType={submitType}
                            />
                          )}
                          {current === 1 && (
                            <FormEducationInfo
                              form={form}
                            />
                          )}
                        </div>
                        <div className='col-12 d-flex justify-content-end' >
                          {current < steps.length - 1 && (
                            <Button type="primary" size="large" onClick={() => next()}>Next</Button>)}
                          {current === steps.length - 1 && (<Button size="large" loading={isLoading} type="primary" htmlType="submit">Confirm</Button>)}
                          {current > 0 && (<Button style={{ margin: '0 8px', }} size="large" onClick={() => prev()} >Previous</Button>)}
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </AdminLayout>
    </>
  )
}
export default Doctors;