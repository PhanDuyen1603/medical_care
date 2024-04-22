import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';
import './Specialites.css';
import { Space, Table, Form, Input, Button, Flex } from 'antd';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FaPlus } from "react-icons/fa";
import {
  useGetSpecialistsQuery,
  useCreateSpecialistMutation,
  useUpdateSpecialistMutation,
  useRemoveSpecialistMutation
} from '@/redux/api/specialistApi';
import slugify from '@/utils/string/slugify';

const initData = {
  name: ''
}

const Specialites = () => {
  const [showModal, setShowModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [initialValues, setInitialValues] = useState(initData);
  const [target, setTarget] = useState({})
  const [searchName, setSearchName] = useState('')
  const [specialistCreate, {
    data: sData,
    isSuccess: sIsSuccess,
    isError: sIsError,
    error: sError,
    isLoading: sIsLoading
  }] = useCreateSpecialistMutation();
  const [deleteSpecialist] = useRemoveSpecialistMutation()
  const [updateSpecialist, { isLoading: isULoading, isError: isUerror }] = useUpdateSpecialistMutation();

  const [form] = Form.useForm()
  const [updateForm] = Form.useForm()

  // get
  const {
    data: specialistData,
    isLoading,
    isError
  } = useGetSpecialistsQuery()
  console.log({
    specialistData,
    isLoading,
    isError
  })

  // modal create
  const handleShow = (type = 'create') => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)

    form.resetFields();
    setInitialValues(initData)
  }
  // modal delete
  const openDeleteModal = (data) => {
    setShowRemoveModal(true)
    setTarget(data)
  }
  const handleCloseRemoveModal = () => setShowRemoveModal(false)
  const handleRemove = () => {
    deleteSpecialist(target.id)
    handleCloseRemoveModal()
    setTarget({})
    swal({
      icon: 'success',
      text: `Successfully specialist remove`,
      timer: 5000
    })
  }

  // model update
  const openUpdateModal = (data) => {
    setShowUpdateModal(true)
    setTarget(data)
  }
  const handleCloseUpdateModal = () => setShowUpdateModal(false)
  const onUpdateFinish = () => {
    //  
    const slug = slugify(target.name)
    updateSpecialist({ data: { ...target, slug }, id: target.id, })
  }

  const onUpdateChange = (changedFields, allFields) => {
    const field = changedFields[0].name[0]
    const value = changedFields[0].value
    setTarget({ ...target, [field]: value });
  }

  // form
  const onFinish = (type = 'create') => {
    // TODO: sumbit
    if (type === 'update') {
      // create
    } else {
      const slug = slugify(initialValues.name)
      specialistCreate({ data: { ...initialValues, slug } })
      handleClose()
    }
  }

  const onFieldsChange = (changedFields, allFields) => {
    const field = changedFields[0].name[0]
    const value = changedFields[0].value
    setInitialValues({ ...initialValues, [field]: value });
  }

  // render
  const actions = (data) => (
    <Space size="middle">
      <div className='action-icon' onClick={() => openUpdateModal(data)}><EditOutlined /></div>
      <div className='action-icon' onClick={() => openDeleteModal(data)}><DeleteOutlined /></div>
    </Space>
  )
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchName],
      render: (text) => <a>{text}</a>,
      onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => actions(data),
    },
  ];

  return (
    <>
      <AdminLayout>
        {/* <button className='btn btn-primary' onClick={() => handleShow('create')}>
          <PlusOutlined />
        </button> */}
        <Flex gap={20}>
          <button className='btn btn-primary' style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleShow('create')}>
            <FaPlus />
          </button>
          <Input.Search size="large" placeholder="Name" onSearch={(e) => setSearchName(e)} onChange={({ target }) => setSearchName(target.value)} />
        </Flex>
        <Table columns={columns} dataSource={specialistData} />

        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          key='modal_1'
        >
          <div className='modal-doctor'>
            <Modal.Header closeButton>
              <Modal.Title>Specialist create</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div className="row">
                <Form
                  layout='vertical'
                  form={form}
                  initialValues={initialValues}
                  className='custom-form mb-5 mt-3 mx-1'
                  onFinish={onFinish}
                  onFieldsChange={onFieldsChange}
                >
                  <div className='col-12'>
                    <Form.Item
                      name="name"
                      label="Name"
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
                  <div className='col-12 d-flex justify-content-end' >
                    <Button size="large" loading={sIsLoading} type="primary" htmlType="submit">Confirm</Button>
                  </div>
                </Form>
              </div>
            </Modal.Body>
          </div>
        </Modal>

        <Modal
          show={showRemoveModal}
          onHide={handleCloseRemoveModal}
          key='modal_2'
        >
          <div className='modal-doctor'>
            <Modal.Header closeButton />
            <Modal.Body>
              <div className="row">
                <div className='col-12'>
                  <p>Are you sure you want to remove <strong>{target.name || ''}</strong> ?</p>
                </div>
                <div className='col-12 d-flex justify-content-center mt-4 gap-3' >
                  <Button size="large" onClick={handleCloseRemoveModal}>Cancel</Button>
                  <Button size="large" type="primary" htmlType="submit" onClick={handleRemove}>Remove</Button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>

        <Modal
          show={showUpdateModal}
          onHide={handleCloseUpdateModal}
          key='modal_3'
        >
          <Modal.Body>
            <div className="row">
              <Form
                layout='vertical'
                form={updateForm}
                initialValues={target}
                className='custom-form mb-5 mt-3 mx-1'
                onFinish={onUpdateFinish}
                onFieldsChange={onUpdateChange}
              >
                <div className='col-12'>
                  <Form.Item
                    name="name"
                    label="Name"
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
                <div className='col-12 d-flex justify-content-end' >
                  <Button size="large" onClick={handleCloseUpdateModal}>Cancel</Button>
                  <Button size="large" loading={sIsLoading} type="primary" htmlType="submit">Confirm</Button>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </AdminLayout>
    </>
  )
}
export default Specialites;