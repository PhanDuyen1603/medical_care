import { useState, useEffect } from 'react'
import { Space, Tag, Button, Empty, Tabs, Flex, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useGetAllTimeSlotQuery, useCreateTimeSlotMutation, useUpdateTimeSlotMutation, useDeleteTimeScheduleMutation } from '../../../redux/api/timeSlotApi';
import { FaWindowClose, FaPlus, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import UseModal from '@/components/UI/UseModal';
import TimePicer from '@/components/UI/form/TimePicer';
import { daysArray } from '@/constant/global'
import moment from 'moment';
import './Doctors.css'

const FormSchedule = ({ doctorId = null }) => {
  const [day, setDay] = useState('monday');
  const [isOpenModal, setIsOpenModal] = useState(false)
  // remove
  const [isRemoveShceduleModal, setIsRemoveShceduleModal] = useState(false)
  const [removeTarget, setRemoveTarget] = useState(null)
  // 
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [submitType, setSubmitType] = useState('create')
  // api using
  const { data, refetch, isLoading, isError } = useGetAllTimeSlotQuery({ doctorId });
  const [createTimeSlot, { isError: AIsError, error, isLoading: AIsLoading, isSuccess }] = useCreateTimeSlotMutation();
  const [UpdateTimeSlot, { isError: uIsError, error: uError, isLoading: UIsLoading, isSuccess: uIsSuccess }] = useUpdateTimeSlotMutation();
  const [deleteTimeSchedule] = useDeleteTimeScheduleMutation();

  const handleChangeStartTime = (id, time, timeString) => {
    const target = selectedTimeSlots.find(x => x.id === id)
    target.startTime = timeString
  }
  const handleChangeEndTime = (id, time, timeString) => {
    const target = selectedTimeSlots.find(x => x.id === id)
    target.endTime = timeString
  }

  // remove modal
  const onOpenRemoveModal = (time) => {
    setRemoveTarget(time)
    setIsRemoveShceduleModal(true)
  }

  const removeSchedule = () => {
    deleteTimeSchedule(removeTarget.id)
    setIsRemoveShceduleModal(false)
  }

  useEffect(() => {
    if (doctorId && data && data[0]?.id) {
      let timeSlots = []
      for (let index = 0; index < data.length; index++) {
        const times = data[index].timeSlot.map(x => ({ ...x, day: data[index].day }))
        timeSlots = times.concat(timeSlots)
      }
      setTimeSlot(timeSlots)
    }
  }, [data])

  const addField = (e) => {
    const getLastValue = timeSlot.length ? timeSlot[timeSlot.length - 1] : null
    if (getLastValue) {
      setSelectedTimeSlots([...selectedTimeSlots, {
        id: getLastValue.id + 1,
        startTime: moment().format('h:mm a'),
        endTime: moment().format('h:mm a')
      }])
    } else {
      setSelectedTimeSlots([{
        id: new Date().getTime(),
        startTime: moment().format('h:mm a'),
        endTime: moment().format('h:mm a')
      }])
    }
    e.preventDefault();
  }

  const remove = (id) => {
    setSelectedTimeSlots(selectedTimeSlots.filter((item) => item.id !== id))
  }

  const handleOk = () => {
    const timeIds = timeSlot.map(x => x.id)
    const times = submitType === 'update' ? selectedTimeSlots?.filter(item => {
      return timeIds.includes(item.id)
    })?.map(x => {
      const { id, ...rest } = x;
      return rest;
    }) || [] : selectedTimeSlots.map(x => {
      const { id, ...rest } = x;
      return rest;
    })
    const data = {
      doctorId,
      day,
      timeSlot: times
    }
    if (submitType === 'create') createTimeSlot({ data });
    else {
      if (selectedTimeSlots.length > 0) {
        const { toCreate, toUpdate } = selectedTimeSlots.reduce((acc, cur) => {
          if (cur.doctorTimeSlotId) {
            acc.toUpdate.push(cur);
          } else {
            acc.toCreate.push({ ...cur, day })
          }
          return acc;
        }, { toCreate: [], toUpdate: [] });
        UpdateTimeSlot({ timeSlot: toUpdate, create: toCreate, doctorId })
      }
    }
    setIsOpenModal(AIsLoading ? true : false)
  }

  // message
  useEffect(() => {
    if (!AIsLoading && AIsError) {
      message.error(error?.data?.message)
    }
    if (isSuccess) {
      message.success('Successfully Add Time Slots')
    }
    if (!UIsLoading && uIsError) {
      message.error(uError?.data?.message)
    }
    if (uIsSuccess) {
      message.success('Successfully Update Time Slots')
    }
  }, [isSuccess, AIsError, error?.data?.message, AIsLoading, uIsSuccess, uIsError, uError?.data?.message, UIsLoading])

  const onTabChange = (day) => {
    const times = timeSlot.filter((item) => item.day === day);
    setSelectedTimeSlots(times)
  }

  const onOpenTimeModal = (day) => {
    setSelectedTimeSlots([]);
    const times = timeSlot.filter((item) => item.day === day) || []
    const type = times && times.length ? 'update' : 'create'
    setDay(day)
    setSubmitType(type)
    setSelectedTimeSlots(times)
    setIsOpenModal(true)
  }

  const customeTag = (content) => {
    const existTimeSlot = timeSlot && timeSlot.length ? timeSlot.filter(item => item.day === content) : []
    return existTimeSlot && (
      <>
        <Flex justify='space-between' align='center'>
          <Space size={[0, 'small']} wrap>
            {
              existTimeSlot.map((time, index) => (
                <Tag bordered={false} color="#2db7f5" key={index + 2} closeIcon={<FaRegTimesCircle />} onClick={() => onOpenRemoveModal(time)}>
                  {time?.startTime} - {time?.endTime}
                </Tag>
              ))
            }
          </Space>
          <Button type="primary" shape="circle" className='icon-btn' onClick={() => onOpenTimeModal(content)}>
            {existTimeSlot && existTimeSlot?.length > 0 ? <FaEdit /> : <FaPlus />}
          </Button>
        </Flex>
      </>
    )
  }
  return (
    <>
      <div className=''>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{
            height: 400,
          }}
          onTabClick={onTabChange}
          items={daysArray.map((day, i) => {
            return {
              label: day,
              key: day,
              children: customeTag(day),
            };
          })}
        />
      </div>
      <UseModal title="Edit Time Slots"
        isModaOpen={isOpenModal}
        handleOk={handleOk}
        handleCancel={() => setIsOpenModal(false)}
        zIndex={2000}
      >
        <form>
          <div className="hours-info">
            <div className="row form-row hours-cont">
              {
                selectedTimeSlots && selectedTimeSlots?.map((item, index) => (
                  <div className="col-12 col-md-10 d-flex align-items-center justify-content-between" key={index + item.id}>
                    <div className="row form-row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Start Time</label>
                          <TimePicer showTimeAsPlaceHolder={true} handleFunction={handleChangeStartTime} time={item.startTime} key="start" id={item.id} minuteStep={15} />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>End Time</label>
                          <TimePicer showTimeAsPlaceHolder={true} handleFunction={handleChangeEndTime} time={item.endTime} key="end" id={item.id} minuteStep={15} />
                        </div>
                      </div>
                    </div>
                    <Button type="primary" size='small' htmlType="submit"
                      onClick={() => remove(item?.id)} block icon={<FaWindowClose />}>
                    </Button>
                  </div>
                ))
              }
            </div>
          </div>

          <div className=" my-2 w-25">
            <Button type="primary" size='small' htmlType="submit" onClick={(e) => addField(e)} block icon={<FaPlus />}>
              Add More
            </Button>
          </div>
        </form>
      </UseModal>
      <UseModal
        title="Do you want to remove shcedule"
        isModaOpen={isRemoveShceduleModal}
        handleOk={removeSchedule}
        handleCancel={() => setIsRemoveShceduleModal(false)}
        z-index={2000}
      >
      </UseModal>
    </>
  )
}

export default FormSchedule;