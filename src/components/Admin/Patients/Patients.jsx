import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout'
import { useGetPatientsQuery } from '@/redux/api/patientApi';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import useSearchColumn from '@/components/common/antd/useSearchColumn'
import './Patients.css';

const transformData = (data) => {
    return data?.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`
    })) || []
}

const Patients = () => {
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
            title: 'Date of birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a className='btn-circle'><EyeOutlined /></a>
                    <a className='btn-circle'><EditOutlined /></a>
                    <a className='btn-circle'><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];
    const { data, isLoading, isError } = useGetPatientsQuery()

    return (
        <>
            <AdminLayout >
                <Table columns={columns} dataSource={transformData(data)} loading={isLoading} />
            </AdminLayout>
        </>
    )
}
export default Patients;