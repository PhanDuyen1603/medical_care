import { Card, Space, Flex } from 'antd';
import { FaLongArrowAltUp } from "react-icons/fa";
import SmallChartRevenue from './SmallChartRevenue';

const CardRevenue = ({ paymentData }) => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom card-revenue'>
          <Flex gap={12} align='center'>
            <h5>Revenue in week</h5>
            <Flex className='total' align="center">
              <p className='currency'>10.000</p>
              <span className='up'><FaLongArrowAltUp /> 5%</span>
            </Flex>

          </Flex>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <div className='card-footer'>
                  <SmallChartRevenue data={paymentData} />
                </div>
              </Flex>
            </div>
          </Flex>
        </Card>
      </Space>
    </>
  )
}

export default CardRevenue;