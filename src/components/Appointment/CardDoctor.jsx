import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import React from 'react';
import img from '@/images/doc/doctor 3.jpg';

const CardDoctor = ({ item }) => {
  return (
    <div className="w-100 mb-3 rounded p-3 text-center" style={{ background: '#f8f9fa' }}>
      <div className="">
        <div className="my-3 patient-img">
          <img src={img} alt="" />
        </div>
        <div className="patients-info mt-4">
          <h5>{item?.firstName + ' ' + item?.lastName}</h5>
          <div className="info">
            {/* <p><FaClock className='icon' /> {moment(item?.appointmentTime).format("MMM Do YY")} </p> */}
            <p><FaLocationArrow className='icon' /> {item?.address}</p>
            <p><FaEnvelope className='icon' /> {item?.email}</p>
            <p><FaPhoneAlt className='icon' /> {item?.services}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDoctor;