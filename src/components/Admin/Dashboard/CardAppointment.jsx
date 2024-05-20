import { Card, Space, Flex } from 'antd';
import { FaLongArrowAltDown } from "react-icons/fa";

const CardAppointment = ({ data = {} }) => {
  const { total = 0, pending = 0, completed = 0, scheduled = 0 } = data;
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom'>
          <h5>Total Appointment</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <Flex className='total' align="center">
                  <p className=''>{total}</p>
                  <span className='down'><FaLongArrowAltDown /> 2%</span>
                </Flex>
                <Flex gap={10}>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>{completed}</p>
                      <p>Completed</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>{pending}</p>
                      <p>InProgress</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>{scheduled}</p>
                      <p>scheduled</p>
                    </div>
                  </Flex>
                </Flex>
              </Flex>

            </div>
          </Flex>
        </Card>
      </Space>
    </>
  )
}

export default CardAppointment;