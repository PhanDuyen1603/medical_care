import { useEffect, useState } from 'react'
import UseModal from '@/components/UI/UseModal';
import { message, Button, Empty } from 'antd';
import moment from 'moment';
import { useGetAllAppointmentTimesQuery } from '@/redux/api/timeSlotApi';
import { useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';

import "./Appointments.css"

const PatientModalChangeAppoimentInfo = ({
  showModal, setShowModal, handleClose, doctorId, appoinment
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectDay, setSelecDay] = useState('');
  const [selectTime, setSelectTime] = useState('');

  const { data: times, refetch, isFetching: dIsLoading, isError: dIsError, error: dError } = useGetAllAppointmentTimesQuery({ id: doctorId });
  const [updateAppointment, { isError: updateIsError, isSuccess, error, isLoading }] = useUpdateAppointmentMutation();

  const availableDates = Array.from({ length: 7 }, (_, index) => moment().clone().add(index, 'days'))

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format('MM-DD-YYYY'))
    setSelecDay(moment(date).format('dddd').toLowerCase())
  }

  const handleSelectTime = (date) => { setSelectTime(date) }
  const handleConfirmSchedule = () => {
    const changeObj = {
      scheduleDate: selectedDate,
      scheduleTime: selectTime
    }
    if (appoinment.id) {
      updateAppointment({ id: appoinment.id, data: changeObj })
    }
  }

  useEffect(() => {
    if (appoinment && appoinment.scheduleDate) {
      setSelectedDate(moment(appoinment?.scheduleDate).format('MM-DD-YYYY'))
      setSelecDay(moment(appoinment?.scheduleDate).format('dddd').toLowerCase())
    }
    if (appoinment && appoinment.scheduleTime) {
      setSelectTime(appoinment.scheduleTime)
    }
  }, [appoinment?.scheduleDate, appoinment?.scheduleTime])

  useEffect(() => {
    if (isSuccess) {
      message.success("Succcessfully Appointment Change Date")
      handleClose()
    }
    if (error) {
      message.error(error?.data?.message);
      handleClose()
    }
  }, [isSuccess, updateIsError, error])

  let dContent = null;
  if (dIsLoading) dContent = <div>Loading ...</div>
  if (!dIsLoading && dIsError) dContent = <div>Something went Wrong!</div>
  if (!dIsLoading && !dIsError && Object.keys(times).length > 0) dContent =
    <>
      {
        times && selectDay && times[selectDay] && times[selectDay].map((item, id) => (
          <div className="col-md-4" key={id + 155}>
            <Button type={item?.slot?.time === selectTime ? "primary" : "default"} shape="round" size='large' className='mb-3' onClick={() => handleSelectTime(item?.slot?.time)}> {item?.slot?.time} </Button>
          </div>
        ))
      }
    </>

  return (
    <>
      <UseModal title="Appointment date updated"
        isModaOpen={showModal}
        width={800}
        handleCancel={handleClose}
        footer={null}
      >
        <div className="row">
          <div className="col-6">
            <div className="row date-picker-modal">
              <div className='date-picker-wrap'>
                <p className='py-2 border-bottom info-head-date'>
                  {selectedDate ? `Selected Date - ${moment(selectedDate).format('LL')}` : 'Pick a Time'}
                </p>
                <div className='info-date-card row'>
                  {
                    availableDates.map((item, index) => (
                      <div
                        key={index + 5}
                        className={`mb-3 col-md-6 ${!times?.[moment(item).format('dddd').toLowerCase()]?.length ? 'disabled' : ''}`}
                        onClick={() => !!times?.[moment(item).format('dddd').toLowerCase()]?.length && handleDateChange(item)}
                      >
                        <div className={`p-3 mb-3 rounded text-center select-date ${moment(item).format('LL') === moment(selectedDate).format('LL') ? 'active' : ''}`}>
                          <div className='select-month'>{moment(item).format('MMMM YYYY')}</div>
                          <div className='select-day-num'>{moment(item).format('D')}</div>
                          <div className='select-month'>{moment(item).format('dddd')}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            {selectedDate && <p className='py-2 border-bottom info-head-date'>{selectTime && 'Time :' + selectTime}</p>}
            <div className="date-card rounded">
              <div className="row text-center mt-3">
                {
                  !selectedDate ? <h5 className='text-title d-flex justify-content-center align-items-center mt-5'>Please Select A Date First</h5> :
                    dContent
                }
              </div>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end mt-2">
            <Button type="primary" onClick={handleConfirmSchedule}>Confirm</Button>
          </div>
        </div>
      </UseModal>
    </>
  )
}

export default PatientModalChangeAppoimentInfo