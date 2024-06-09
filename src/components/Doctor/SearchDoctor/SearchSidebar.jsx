import React, { useState } from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import { doctorSpecialistOptions, genderOptions } from '@/constant/global';

const SearchSidebar = ({ setSearchTerm, setSorByGender, setSpecialist, setPriceRange, resetFilter, query, handleSearch, setCanRefetch }) => {
  const [searchGender, setSearchGender] = useState(null)
  const [searchSpecialist, setSearchSpecialist] = useState(null)
  const handleDateChange = (_date, _dateString) => { }
  const onSelectGender = (e) => {
    setSearchGender(e?.target.value)
    setSorByGender(e?.target.value)
  }

  const onSelectSepcialist = (e) => {
    setSearchSpecialist(e?.target.value)
    setSpecialist(e?.target.value)
  }

  const onRangeChange = (range) => {
    setCanRefetch(false)
    const obj = {
      min: range[0],
      max: range[1]
    }
    setPriceRange(obj)
  }
  const onChangeSearchTerm = (e) => {
    const value = e.target.value
    setCanRefetch(false)
    setSearchTerm(value);
  }
  const onResetFilter = () => {
    setSearchGender(null)
    setSearchSpecialist(null)
    onChangeSearchTerm({ target: { value: '' } })
    resetFilter()
  }
  return (
    <div className="col-md-12 col-lg-4 col-xl-3">

      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>
        <div className="mb-3">
          <Search placeholder="Search..." enterButton onChange={onChangeSearchTerm} onSearch={handleSearch} />
        </div>

        {/* <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Date Range</h6>
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={handleDateChange}
          />
        </div> */}

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Gender</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={[{ label: "All", value: null }, ...genderOptions]} value={searchGender} onChange={onSelectGender} />
          </div>
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Price Range</h6>
          <Slider range min={1} max={1500} defaultValue={[1, 5]} onChange={onRangeChange} />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={[{ label: "All", value: null }, ...doctorSpecialistOptions]} value={searchSpecialist} onChange={onSelectSepcialist} />
          </div>
        </div>

        <Button className='w-100 mt-4 mb-2' type="primary" style={{ backgroundColor: '#1977cc' }} shape="round" icon={<FaSearch />} size="sm" onClick={handleSearch}>Search</Button>
        {
          (query.min || query.max || query.gender || query.searchTerm || query.specialist) && <Button className='w-100 mt-4 mb-2' style={{ backgroundColor: '#1977cc' }} onClick={onResetFilter} type="primary" shape="round" icon={<FaRedoAlt />} size="sm">Reset</Button>
        }
      </div>

    </div>
  )
}

export default SearchSidebar