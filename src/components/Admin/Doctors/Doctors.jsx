import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout'
import './Doctors.css';
import { Table, Space } from 'antd';
import useSearchColumn from '@/components/common/antd/useSearchColumn'
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const transformData = (data) => {
    return data?.map((item) => {
        return {
            ...item,
            fullName: `${item.firstName} ${item.lastName}`
        };
    }) || []
}

const Doctors = () => {
    const query = {};

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
            render: (_, record) => (
                <Space size="middle">
                    <a className='btn-circle'><EyeOutlined /></a>
                    <a className='btn-circle'><EditOutlined /></a>
                    <a className='btn-circle'><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    const { data: doctorData, isLoading, isError } = useGetDoctorsQuery({ ...query })
    const doctors = doctorData?.doctors;
    return (
        <>
            <AdminLayout >
                <Table columns={columns} dataSource={transformData(doctors)} loading={isLoading} />
            </AdminLayout>
        </>
    )
}
export default Doctors;