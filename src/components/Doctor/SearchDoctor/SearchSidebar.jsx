import React, { useState, useEffect } from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import { doctorSpecialistOptions, genderOptions } from '@/constant/global';

const SearchSidebar = ({ searchTerm, setSearchTerm, setSorByGender, setSpecialist, setPriceRange, resetFilter, query, handleSearch, setCanRefetch }) => {
  const [searchGender, setSearchGender] = useState(null)
  const [searchSpecialist, setSearchSpecialist] = useState(null)
  const [showClearIcon, setShowClearIcon] = useState(false)
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
    setSearchTerm('');
    resetFilter()
  }
  // input handle
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setShowClearIcon(true)
    } else {
      setShowClearIcon(false)
    }
  }, [searchTerm])
  return (
    <div className="col-md-12 col-lg-4 col-xl-3">
      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>
        <div className="mb-3">
          {/* custom search bar */}
          <div id='custom_search_bar' className='search-bar'>
            <input type="text" placeholder="Search..." className='ant-input' value={searchTerm} onChange={onChangeSearchTerm} onKeyDown={handleKeyDown} />
            <button type="button" className="ant-btn ant-btn-primary ant-input-search-button" onClick={handleSearch}>
              <span className="ant-btn-icon"><span role="img" aria-label="search" className="anticon anticon-search"><svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span>
              </span>
            </button>
            <span className={`clear-icon ${showClearIcon ? 'show' : ''}`} role="button" tabindex="-1" onClick={onResetFilter}>
              <span role="img" aria-label="close-circle" className={`anticon anticon-close-circle`}>
                <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path></svg>
              </span>
            </span>
          </div>
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