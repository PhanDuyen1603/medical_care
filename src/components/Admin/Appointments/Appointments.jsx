import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import { useGetAppointmentsQuery } from '@/redux/api/appointmentApi';
import useSearchColumn from '@/components/common/antd/useSearchColumn';
import { Table } from 'antd';

import './Appointments.css';

const transformData = (data) => {
	return data?.map((item) => {
		return {
			...item,
			doctorFullName: `${item.doctor?.firstName} ${item.doctor?.lastName}`,
			specialist: item.doctor.services,
			patientFullname: `${item.firstName} ${item.lastName}`
		};
	}) || [];
}

const AdminAppointments = () => {
	const { data = [], isLoading } = useGetAppointmentsQuery();
	console.log({
		data,
		isLoading,
	})

	const { getColumnSearchProps } = useSearchColumn()
	const columns = [
		{
			title: 'Doctor Name',
			dataIndex: 'doctorFullName',
			key: 'doctorFullName',
			width: '30%',
			...getColumnSearchProps('doctorFullName'),
		},
		{
			title: 'specialist',
			dataIndex: 'specialist',
			key: 'specialist',
			width: '20%',
			...getColumnSearchProps('specialist'),
		},
		{
			title: 'Patient Name',
			dataIndex: 'patientFullname',
			key: 'patientFullname',
			...getColumnSearchProps('patientFullname'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			...getColumnSearchProps('status'),
			sorter: (a, b) => b.status.length - a.status.length,
			sortDirections: ['descend', 'ascend'],
		},
		// {
		// 	title: 'Amount',
		// 	dataIndex: 'amount',
		// 	key: 'amount',
		// 	...getColumnSearchProps('amount'),
		// 	sorter: (a, b) => b.status.length - a.status.length,
		// 	sortDirections: ['descend', 'ascend'],
		// }
	];

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