import { Col, Row } from 'antd';
import { Space, Typography, Flex, Badge, Card } from 'antd';
import RatingStars from './Widgets/RatingStars';
import RatingCount from './Widgets/RatingCount';

const ReviewOverall = ({
  total = 10000,
  average = 5,
  ratings = {
    "rate1": 0,
    "rate2": 1,
    "rate3": 1,
    "rate4": 1,
    "rate5": 11,
  }
}) => {
  const { Title, Text } = Typography;
  const transformRatings = (data) => {
    const listRate = Object.keys(data).reduce((acc, key) => {
      const res = {
        name: key.replace('rate', ''),
        value: data[key],
        cost: data[key],
      }
      return [...acc, res];
    }, [])
    return listRate.sort((a, b) => +b.name - +a.name)
  }
  return (
    <Row gutter={{
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
    }} style={{ borderBottom: '1px solid gray' }}>
      <Col span={8}>
        <Card bordered={false} style={{ border: 'none', boxShadow: 'none' }}>
          <Space direction="vertical">
            <Title level={4}>Total Reviews</Title>
            <Flex gap="small" wrap="nowrap" align='center' >
              <Title level={3}>{total}</Title>
            </Flex>
            <Text type="secondary">Total Reviews this year</Text>
          </Space>
        </Card>
      </Col>
      <Col span={8} style={{ borderLeft: '1px solid gray' }}>
        <Card bordered={false} style={{ border: 'none', boxShadow: 'none' }}>
          <Space direction="vertical">
            <Title level={4}>Average Ratings</Title>
            <Flex gap="small" wrap="nowrap" align='center' >
              <Title level={3}>{average}</Title>
              <RatingStars rating={average} />
            </Flex>
            <Text type="secondary">Avarage Reviews this year</Text>
          </Space>
        </Card>
      </Col>
      <Col span={8} style={{ borderLeft: '1px solid gray' }}>
        <RatingCount ratings={transformRatings(ratings)} />
      </Col>

    </Row>
  )
}

export default ReviewOverall