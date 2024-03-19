import React, { useState } from 'react';
import { Radio, Empty, Pagination } from 'antd';
import { doctorSpecialistOptions } from '@/constant/global';
import { useGetDoctorsQuery } from '@/redux/api/doctorApi';
import CardDoctor from '@/components/Appointment/CardDoctor';
import { useSearchParams } from 'react-router-dom';

const SelectDoctor = ({ doctorId, setDoctorId, selectValue, setSelectValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [specialist, setSpecialist] = useState("");

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
    setSpecialist("");
  }

  const { data, isLoading, isError } = useGetDoctorsQuery({ ...query })
  const doctorsData = data?.doctors;
  const meta = data?.meta;

  const onSelectSepcialist = (e) => setSpecialist(e.target.value)

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
          <div className='col-md-12 col-lg-4 cursor-pointer' key={id} onClick={() => handleSelectDoctor(item)}>
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
      <div className="col-md-12 col-lg-4 col-xl-3">
        <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
          <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>

          <div className='mb-3'>
            <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
            <div className='d-flex flex-column'>
              <Radio.Group options={doctorSpecialistOptions} onChange={onSelectSepcialist} />
            </div>
          </div>

        </div>
      </div>
      <div className="col-md-12 col-lg-8 col-xl-9">
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