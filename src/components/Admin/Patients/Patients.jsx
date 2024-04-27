import React, { useState } from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout'
import { useGetPatientsQuery } from '@/redux/api/patientApi';
import { DeleteOutlined, EditOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { Table, Space, Flex, Input } from 'antd';
import useSearchColumn from '@/components/common/antd/useSearchColumn'
import ModalSendMail from './ModalSendMail';
import './Patients.css';

const transformData = (data) => {
    return data?.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`
    })) || []
}

const Patients = () => {
    const [searchName, setSearchName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const { getColumnSearchProps } = useSearchColumn()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '30%',
            ...getColumnSearchProps('fullName'),
            filteredValue: [searchName],
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
            title: 'Date of birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data, record) => (
                <Space size="middle">
                    <a className='btn-circle' onClick={() => sendingMail(data)}><MailOutlined /></a>
                    <a className='btn-circle'><EyeOutlined /></a>
                    <a className='btn-circle'><EditOutlined /></a>
                    <a className='btn-circle'><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];
    const sendingMail = (data) => {
        setSelectedPatient(data)
        setShowModal(true)
    }
    const { data, isLoading, isError } = useGetPatientsQuery()

    return (
        <>
            <AdminLayout >
                <Flex gap={20}>
                    {/* <button className='btn btn-primary' onClick={() => handleShow('create')}>
                        <FaPlus />
                    </button> */}
                    <Input.Search size="large" placeholder="Patients name" onSearch={(e) => setSearchName(e)} onChange={({ target }) => setSearchName(target.value)} />
                </Flex>
                <Table columns={columns} dataSource={transformData(data)} loading={isLoading} />
                <ModalSendMail showModal={showModal} setShowModal={setShowModal} data={selectedPatient} />
            </AdminLayout>
        </>
    )
}
export default Patients;