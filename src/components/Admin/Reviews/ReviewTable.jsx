import { Table, Tag } from 'antd'
import useSearchColumn from '@/components/common/antd/useSearchColumn';
import img from '@/images/doc/doctor 3.jpg';
import { Flex, Space, Avatar, Typography } from 'antd';
import RatingStars from './Widgets/RatingStars';
import { UserOutlined } from '@ant-design/icons';
import { getPatientName } from '@/utils/string/patient';
import dayjs from 'dayjs'
import { BiLike, BiDislike } from "react-icons/bi";
import './Reviews.css'

const ReviewTables = ({
  tableData,
  isLoading
}) => {
  const { Title, Text } = Typography;
  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      render: (data, payload) => (
        <Flex gap="small">
          <Avatar shape="square" size={64} icon={<UserOutlined />} src={data.img || img} />
          <Title level={5}>DR. {data.firstName} {data.lastName}</Title>
        </Flex>
      ),
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: (data, payload) => (
        <Flex gap="30px">
          <Space>
            <Flex justify='center'>
              <Avatar shape="square" size={64} icon={<UserOutlined />} src={data.img || img} />
            </Flex>
          </Space>
          <Space>
            <Space direction='vertical' >
              <Title level={5}>{getPatientName(data)}</Title>
              {/* <Text><strong>total review</strong>: 12</Text>
              <Text><strong>total appointment</strong>: 12</Text> */}
            </Space>
          </Space>
        </Flex>
      ),
    },
    {
      title: 'Review',
      dataIndex: 'star',
      key: 'star',
      filters: [
        {
          text: '1',
          value: '1',
        },
        {
          text: '2',
          value: '2',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '4',
          value: '4',
        },
        {
          text: '5',
          value: '5',
        },
      ],
      onFilter: (value, record) => record.star.indexOf(value) === 0,
      render: (data, payload) => (
        <Space direction='vertical' >
          <Flex gap={20}>
            <RatingStars rating={payload.star} />
          </Flex>
          <div>
            <p>{payload.description}</p>
          </div>
          <Flex gap={40}>
            {
              payload.isRecommended &&
              <div className='custom-btn like-btn'>
                <BiLike size={25} />
                <span>Recommended</span>
              </div>
            }
            {
              !payload.isRecommended &&
              <div className='custom-btn dislike-btn'>
                <BiDislike size={25} />
                <span>Not Recommended</span>
              </div>
            }
          </Flex>
        </Space>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data, payload) => (
        <Text>{dayjs(data).format('MMM D, YYYY')}</Text>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={tableData} loading={isLoading} />
  )
}
export default ReviewTables;