import { Card, Space, Flex } from 'antd';
import { FaLongArrowAltUp } from "react-icons/fa";

const CardRevenue = () => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom'>
          <h5>Revenue</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <Flex className='total' align="center">
                  <p className='currency'>10.000</p>
                  <span className='up'><FaLongArrowAltUp /> 5%</span>
                </Flex>
                <div className='card-footer'>
                  <p>Avg cost per patient <strong>2k</strong></p>
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