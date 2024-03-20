import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout'
import './Doctors.css';
import { Table } from 'antd';
import useSearchColumn from './useSearchColumn'
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';

const data = [
    {
        key: '1',
        name: 'John Brown',
        email: 'john@gmail.com',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        email: 'john@gmail.com',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        email: 'john@gmail.com',
        age: 29,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        email: 'john@gmail.com',
        age: 20,
        address: 'London No. 2 Lake Park',
    },
];

const Doctors = () => {
    const query = {};

    const { getColumnSearchProps } = useSearchColumn()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            sorter: (a, b) => b.age - a.age,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const { data: doctorData, isLoading, isError } = useGetDoctorsQuery({ ...query })
    const doctors = doctorData?.doctors;

    return (
        <>
            <AdminLayout >
                <Table columns={columns} dataSource={data} />
            </AdminLayout>
        </>
    )
}
export default Doctors;