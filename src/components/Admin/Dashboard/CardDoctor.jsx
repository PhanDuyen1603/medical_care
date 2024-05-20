import { Card, Space, Flex, Image } from 'antd';

const CardDoctor = ({ data = {} }) => {
  let total = 0;
  let first = {};
  let second = {};
  let third = {};
  if (data && data.total) {
    let sortable = [];
    for (var specialist in data) {
      sortable.push([specialist, data[specialist]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    })
    total = sortable[0][1]
    first = {
      title: sortable[1][0],
      value: sortable[1][1]
    }
    second = {
      title: sortable[2][0],
      value: sortable[2][1]
    }
    third = {
      title: sortable[3][0],
      value: sortable[3][1]
    }
  }
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card className='card-custom'>
          <h5>Total doctors</h5>
          <Flex gap="middle" vertical>
            <div className='card-patient'>
              <Flex vertical >
                <Flex className='total' align="center">
                  <p className=''>{total}</p>
                </Flex>
                <Flex gap={10}>
                  <Flex className='single' align="center" gap={10}>
                    {
                      first && first.title && (
                        <div className='specialist'>
                          <Image src={`/images/specialist/${first.title}.png`} preview={false} width={40} height={40} />
                          <p>{first.value}</p>
                        </div>
                      )
                    }
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    {
                      second && second.title && (
                        <div className='specialist'>
                          <Image src={`/images/specialist/${second.title}.png`} preview={false} width={40} height={40} />
                          <p>{second.value}</p>
                        </div>
                      )
                    }
                  </Flex>
                  <Flex className='single' align="center" gap={10}>
                    {
                      third && third.title && (
                        <div className='specialist'>
                          <Image src={`/images/specialist/${third.title}.png`} preview={false} width={40} height={40} />
                          <p>{third.value}</p>
                        </div>
                      )
                    }
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