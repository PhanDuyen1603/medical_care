import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import { useGetAppointmentsQuery } from '@/redux/api/appointmentApi';
import useSearchColumn from '@/components/common/antd/useSearchColumn';
import { Table, Tag } from 'antd';
import { statusColor, paymentStatusColor, appointemntStatusOption } from "@/constant/global"

import './Appointments.css';

const transformData = (data) => {
	return data?.map((item, index) => {
		return {
			...item,
			key: index + 1,
			doctorFullName: `${item.doctor?.firstName} ${item.doctor?.lastName}`,
			specialist: item.doctor.services,
			patientFullname: `${item.firstName} ${item.lastName}`
		};
	}) || [];
}

const AdminAppointments = () => {
	const { data = [], isLoading } = useGetAppointmentsQuery();
	const { getColumnSearchProps } = useSearchColumn()
	const columns = [
		{
			title: 'No',
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: 'Track Id',
			dataIndex: 'trackingId',
			key: 'trackingId',
			...getColumnSearchProps('trackingId'),
		},
		{
			title: 'Patient Name',
			dataIndex: 'patientFullname',
			key: 'patientFullname',
			...getColumnSearchProps('patientFullname'),
		},
		{
			title: 'Email Address',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email'),
		},
		{
			title: 'Doctor Name',
			dataIndex: 'doctorFullName',
			key: 'doctorFullName',
			...getColumnSearchProps('doctorFullName'),
		},
		{
			title: 'Date',
			dataIndex: 'scheduleDate',
			key: 'scheduleDate',
		},
		{
			title: 'Time',
			dataIndex: 'scheduleTime',
			key: 'scheduleTime',
		},
		{
			title: 'Payment',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus',
			filters: [
				{
					text: 'Paid',
					value: 'paid',
				},
				{
					text: 'Unpaid',
					value: 'unpaid',
				}
			],
			onFilter: (value, record) => record.paymentStatus.indexOf(value) === 0,
			render: (data) => (
				<>
					<Tag color={paymentStatusColor[data]} className='text-uppercase'>{data}</Tag>
				</>
			),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			filters: appointemntStatusOption,
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: (_, record) => statusTag(_, record),
		},
	];

	// status
	const statusTag = (data, record) => {
		return (
			<>
				<Tag color={statusColor[data]} className='text-uppercase'>{data === 'pending' ? 'booking' : data}</Tag>
			</>
		)
	}

	return (
		<>
			<AdminLayout >
				<div className="row">
					<div className="col-md-12">
						<Table columns={columns} dataSource={transformData(data)} loading={isLoading} />
					</div>
				</div>
			</AdminLayout>
		</>
	)
}
export default AdminAppointments;