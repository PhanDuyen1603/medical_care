import React, { useEffect, useState } from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import img from '@/images/doc/doctor 3.jpg';
import './Appointments.css';
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '@/redux/api/appointmentApi';
import moment from 'moment';
import { Button, Empty, message, Tag, Tooltip } from 'antd';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaBriefcaseMedical } from "react-icons/fa";
import { clickToCopyClipBoard } from '@/utils/copyClipBoard';
import { statusColor, paymentStatusColor, prescriptionStatusColor } from "@/constant/global"

const Appointments = () => {
    const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
    const [updateAppointment, { isError: updateIsError, isSuccess, error }] = useUpdateAppointmentMutation();

    const updatedApppointmentStatus = (id, type) => {
        const changeObj = {
            status: type
        }
        if (id) {
            updateAppointment({ id, data: changeObj })
        }
    }

    const getPatientName = (item) => {
        const patientObj = item?.patient ? item.patient : item
        return patientObj.firstName + '' + patientObj.lastName;
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Succcessfully Appointment Updated")
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, updateIsError, error])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty />
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item) => (
                    <div className="w-100 mb-3 rounded p-3" style={{ background: '#f8f9fa' }} key={item.id}>
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-12 col-lg-9 d-flex align-items-center gap-3">
                                <Link to={`/`} className="patient-img">
                                    <img src={img} alt="" />
                                </Link>
                                <div className="patients-info">
                                    <h5>{getPatientName(item)}</h5>
                                    <Tooltip title="Copy Tracking Id">
                                        <Button>
                                            <h6>Tracking<Tag color="#87d068" className='ms-2 text-uppercase' onClick={() => clickToCopyClipBoard(item?.trackingId)}>{item?.trackingId}</Tag></h6>
                                        </Button>
                                    </Tooltip>

                                    <div className="info">
                                        <p><FaClock className='icon' /> {moment(item?.scheduleDate).format("LL")} </p>
                                        <p><FaLocationArrow className='icon' /> {item?.address || item?.patient?.address}</p>
                                        <p><FaEnvelope className='icon' /> {item?.email || item?.patient?.email}</p>
                                        <p><FaPhoneAlt className='icon' /> {item?.phone}</p>

                                    </div>
                                </div>
                                <div className='appointment-status card p-3 border-primary'>
                                    <p>Current Status - <Tag color={statusColor[item.status]} className='text-uppercase'>{item?.status === 'pending' ? 'booking' : item?.status}</Tag></p>
                                    <p>Patient Status - <Tag color="#2db7f5" className='text-uppercase'>{item?.patientType}</Tag></p>
                                    <p>Is Follow Up - <Tag color={item?.isFollowUp ? '#87d068' : '#f51124'} className='text-uppercase'>{item?.isFollowUp ? "Yes" : "No"}</Tag></p>
                                    <p> Is Paid - <Tag color={paymentStatusColor[item.paymentStatus]} className='text-uppercase'>{item?.paymentStatus}</Tag></p>
                                    <p> Prescribed - <Tag color={prescriptionStatusColor[item.prescriptionStatus]} className='text-uppercase'>{item?.prescriptionStatus}</Tag></p>
                                </div>
                            </div>
                            <div className='col-12 col-lg-3 d-flex gap-2 flex-wrap'>
                                <Link to={`/dashboard/appointments/${item?.id}`}>
                                    <Button type="primary" icon={<FaEye />} size="small">View</Button>
                                </Link>
                                {
                                    item.prescriptionStatus === 'notIssued'
                                        ?
                                        <Link to={`/dashboard/appointment/treatment/${item?.id}`}>
                                            <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Treatment</Button>
                                        </Link>
                                        :
                                        <Link to={`/dashboard/prescription/${item?.prescription[0]?.id}`}>
                                            <Button type="primary" icon={<FaEye />} size="small" >Prescription</Button>
                                        </Link>
                                }
                                {
                                    item?.isFollowUp && <Link to={`/dashboard/appointment/treatment/edit/${item?.prescription[0]?.id}`}>
                                        <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Follow Up</Button>
                                    </Link>
                                }

                                {
                                    item?.status === 'pending' &&
                                    <>
                                        <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(item.id, 'scheduled')}>Accept</Button>
                                        <Button type='primary' icon={<FaTimes />} size="small" danger onClick={() => updatedApppointmentStatus(item.id, 'cancel')}>Cancel</Button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <DashboardLayout>
            {content}
        </DashboardLayout>
    )
}

export default Appointments