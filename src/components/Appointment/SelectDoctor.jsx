import React, { useState } from 'react';
import { Empty, Pagination } from 'antd';
import { useGetDoctorsAvailableQuery } from '@/redux/api/doctorApi';
import CardDoctor from '@/components/Appointment/CardDoctor';

const SelectDoctor = ({ specialist, doctorId, setDoctorId, time, appointmentDate }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1000);

  const appointmentQuery = {}
  appointmentQuery["time"] = time;
  appointmentQuery["appointmentDate"] = appointmentDate;
  appointmentQuery["specialist"] = specialist;
  appointmentQuery["limit"] = size;
  appointmentQuery["page"] = page;

  const { data, isLoading, isError } = useGetDoctorsAvailableQuery({ ...appointmentQuery })
  const doctorsData = data?.doctors;
  const meta = data?.meta;

  const handleSelectDoctor = (item) => {
    setDoctorId(item.id);
    // handleSetQuery('doctor', item.id);
  }

  let content = null;
  if (isLoading) content = <>Loading ...</>;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>
  if (!isLoading && !isError && doctorsData.length === 0) content = <div><Empty /></div>
  if (!isLoading && !isError && doctorsData.length > 0) content =
    <>
      {
        doctorsData && doctorsData?.map((item, id) => (
          <div className='col-md-12 col-lg-3 cursor-pointer' key={id} onClick={() => handleSelectDoctor(item)}>
            <CardDoctor item={item} isActive={doctorId === item.id} />
          </div>
        ))
      }
    </>

  const onShowSizeChange = (current, pageSize) => {
    setPage(page);
    setSize(pageSize)
  }

  return (
    <div className='row'>
      <div className="col-12">
        <div className='row'>
          {content}
        </div>
        <div className='text-center mt-5 mb-5'>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={meta?.total}
            pageSize={size}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectDoctor;