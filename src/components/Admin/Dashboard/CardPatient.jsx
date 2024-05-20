import { Card, Space, Flex } from 'antd';
import { FaMale, FaFemale, FaLongArrowAltDown } from "react-icons/fa";

const CardPatient = ({ data = {} }) => {
  const { total = 0 } = data;
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card style={{ width: '100%' }} className='card-custom'>
          <h5>Total Patients</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex gap={12} align="end" >
                <div className='left'>
                  <Flex className='total' align="center">
                    <p className=''>{total}</p>
                    {/* <span className='down'><FaLongArrowAltDown /> 2%</span> */}
                  </Flex>
                  <Flex gap="middle" >
                    <Flex className='single' align="center" gap={10}>
                      <FaMale size={30} />
                      <div>
                        <p>529</p>
                        <p>Male</p>
                      </div>
                    </Flex>
                    <Flex className='single' align="center" gap={10}>
                      <FaFemale size={30} />
                      <div>
                        <p>330</p>
                        <p>Female</p>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                <div className='right'>
                  <div className='right-title'>
                    <h6>Patient status</h6>
                  </div>
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
                </div>
              </Flex>
            </div>
          </Flex>
        </Card>
      </Space>
    </>
  )
}

export default CardPatient;