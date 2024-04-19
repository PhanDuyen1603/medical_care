import React from 'react';
import img from '../../../images/doc/doctor 3.jpg';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetDoctorPatientsQuery } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { Empty, Row, Col } from 'antd';

const MyPatients = () => {
    const { data, isLoading, isError } = useGetDoctorPatientsQuery();
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty />
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {data && data?.map((item) => (
                <Col span={6} className="w-100 mb-3 rounded text-center">
                    <div className='p-3' style={{ background: '#f8f9fa' }}>
                        <Link to={'/'} className="my-3 patient-img">
                            <img src={img} alt="" />
                        </Link>
                        <div className="patients-info mt-4">
                            <h5>{item?.firstName + ' ' + item?.lastName}</h5>
                            <div className="info">
                                <p><FaClock className='icon' /> {moment(item?.appointmentTime).format("MMM Do YY")} </p>
                                <p><FaLocationArrow className='icon' /> {item?.address}</p>
                                <p><FaEnvelope className='icon' /> {item?.email}</p>
                                <p><FaPhoneAlt className='icon' /> {item?.mobile}</p>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    return (
        <DashboardLayout>
            <Row gutter={12}>
                {content}
            </Row>
        </DashboardLayout>
    )
}

export default MyPatients