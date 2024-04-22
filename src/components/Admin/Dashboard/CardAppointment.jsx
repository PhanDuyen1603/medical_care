import { Card, Space, Flex } from 'antd';
import { FaLongArrowAltDown } from "react-icons/fa";

const CardAppointment = () => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom'>
          <h5>Total Appointment</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <Flex className='total' align="center">
                  <p className=''>1100</p>
                  <span className='down'><FaLongArrowAltDown /> 2%</span>
                </Flex>
                <Flex gap={10}>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>89</p>
                      <p>Completed</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>109</p>
                      <p>InProgress</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>89</p>
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