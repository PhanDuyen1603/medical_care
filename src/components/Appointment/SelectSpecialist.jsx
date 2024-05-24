import { Radio, Image } from 'antd';
import { doctorSpecialistOptions } from '@/constant/global';
import './index.css'

const options = [
  ...doctorSpecialistOptions
]


const SelectSpecialist = ({ specialist, setSpecialist }) => {
  const onSelectSepcialist = (e) => setSpecialist(e.target.value)

  return (
    <>
      <div>
        <div className="">
          <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
            <div className='mb-3'>
              <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
              <div className='d-flex flex-column'>
                <Radio.Group
                  onChange={onSelectSepcialist}
                  value={specialist}
                  className='ant-radio-group-row'
                  style={{ flexDirection: 'row !important', flexWrap: 'wrap', justifyContent: 'space-around' }}
                >
                  {
                    options.map((item, id) => (
                      <Radio value={item.value} key={id} className='image-checkbox'>
                        <label htmlFor="myCheckbox1">
                          <Image src={`/images/specialist/${item.img}.png`} preview={false} width={120} height={120} />
                        </label>
                        {item.label}
                      </Radio>
                    ))
                  }
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectSpecialist;