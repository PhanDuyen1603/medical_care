import { Card, Space, Flex } from 'antd';

const CardDoctor = () => {
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom'>
          <h5>Total doctors</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <Flex className='total' align="center">
                  <p className=''>880</p>
                </Flex>
                <Flex gap={10}>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>89</p>
                      <p>Waiting</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>109</p>
                      <p>Waiting</p>
                    </div>
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    <div>
                      <p>89</p>
                      <p>Waiting</p>
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

export default CardDoctor;