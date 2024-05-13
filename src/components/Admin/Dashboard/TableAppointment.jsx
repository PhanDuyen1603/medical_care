import { Space, Table, Tag } from 'antd';
import { statusColor, paymentStatusColor, appointemntStatusOption } from "@/constant/global"
import useSearchColumn from '@/components/common/antd/useSearchColumn';

const TableAppointment = ({ data }) => {
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
      <Table dataSource={data} columns={columns} pagination={{
        position: ['topRight'],
      }} />;
    </>
  )
}

export default TableAppointment