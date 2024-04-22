import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Dashboard.css';
import { Flex, Card } from 'antd'
import ChartArea from './ChartArea'
import CardPatient from './CardPatient'
import CardDoctor from './CardDoctor'
import CardRevenue from './CardRevenue';
import CardAppointment from './CardAppointment';
import TableAppointment from './TableAppointment';

const AdminDashboard = () => {
    return (
        <>
            <AdminLayout >
                <Flex gap={24} wrap='wrap' className='mb-3' >
                    <CardPatient />
                    <CardDoctor />
                    <CardAppointment />
                    <CardRevenue />
                </Flex>
                <Flex className='mb-3'>
                    <ChartArea />
                </Flex>
                <Flex className="mb-3">
                    <Card style={{ width: '100%' }} className='card-custom'>
                        <h4 className="card-title">Recent appointments</h4>
                        <TableAppointment />
                    </Card>
                </Flex>
            </AdminLayout>
        </>
    )
}
export default AdminDashboard;