import React from 'react'
import AdminLayout from '@/components/Admin/AdminLayout/AdminLayout';
import './Specialites.css';
import { Space, Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>update</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        slug: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        slug: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        slug: 'Sydney No. 1 Lake Park',
    },
];

const Specialites = () => {
    return (
        <>
            <AdminLayout >
                <Table columns={columns} dataSource={data} />
            </AdminLayout>
        </>
    )
}
export default Specialites;