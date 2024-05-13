import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Dashboard.css';
import { Flex, Card, Image, Tag } from 'antd'
import ChartArea from './ChartArea'
import CardPatient from './CardPatient'
import CardDoctor from './CardDoctor'
import CardRevenue from './CardRevenue';
import CardAppointment from './CardAppointment';
import TableAppointment from './TableAppointment';
import { useGetChartAppointmentsQuery, useGetAppointmentsQuery } from "@/redux/api/appointmentApi"
import { useGetPaymentChartDataQuery } from '@/redux/api/payment';
import dayjs from 'dayjs'

const AdminDashboard = () => {
    const [chartFilter, setChartFilter] = React.useState({
        date: dayjs().format('MM/DD/YYYY'),
        range: '7days',
    })
    const { data: appointments = [], isFetching: appoimentLoading } = useGetAppointmentsQuery({ limit: 10 });
    const { data: chartData = [], refetch, isFetching } = useGetChartAppointmentsQuery(chartFilter);
    const { data: paymentData = [] } = useGetPaymentChartDataQuery()

    return (
        <>
            <AdminLayout >
                <Flex gap={24} wrap='wrap' className='mb-3' >
                    <CardPatient />
                    <CardDoctor />
                    <CardAppointment />
                    <CardRevenue paymentData={paymentData} />
                </Flex>
                <Flex className='mb-3'>
                    {
                        isFetching ? <Image src='/images/skeleton_charts.png' preview={false} height={520} width="100%" /> :
                            <ChartArea refetch={refetch} isLoading={isFetching} data={chartData} setChartFilter={setChartFilter} chartFilter={chartFilter} />
                    }
                </Flex>
                <Flex className="mb-3">
                    <Card style={{ width: '100%' }} className='card-custom'>
                        <h4 className="card-title">Recent appointments</h4>
                        <TableAppointment data={appointments} />
                    </Card>
                </Flex>
            </AdminLayout>
        </>
    )
}
export default AdminDashboard;