import React, { useState } from 'react';
import { Empty, Pagination } from 'antd';
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';
import CardDoctor from '@/components/Appointment/CardDoctor';
import { useSearchParams } from 'react-router-dom';

const SelectDoctor = ({ specialist, doctorId, setDoctorId, selectValue, setSelectValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // const [specialist, setSpecialist] = useState(0);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  specialist !== '' && (query["specialist"] = specialist);

  const handleSetQuery = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const resetFilter = () => {
    setPage(1);
    setSize(10);
    setSortOrder("");
    setSortOrder("");
  }

  const { data, isLoading, isError } = useGetDoctorsQuery({ ...query })
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