import React, { useEffect, useState } from 'react'
import img from '@/images/avatar.jpg';
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical, FaEnvelope } from "react-icons/fa";
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '@/redux/api/appointmentApi';
import moment from 'moment';
import { Button, message } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import ModalSendMail from '@/components/Admin/Patients/ModalSendMail';
import { Tabs } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});
    const { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({ sortBy });
    const [updateAppointment, { isError, isSuccess, error }] = useUpdateAppointmentMutation();
    const navigate = useNavigate();
    const handleOnselect = (value) => {
        // eslint-disable-next-line eqeqeq
        setSortBy(value == 1 ? 'upcoming' : value == 2 ? 'today' : sortBy)
        refetch()
    }


    const updatedApppointmentStatus = (data, type) => {
        const changeObj = {
            status: type
        }
        if (data.id) {
            updateAppointment({ id: data.id, data: changeObj })
        }
    }

    const openSendingMailModal = (data) => {
        setShowModal(true)
        setSelectedPatient(data)
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Succcessfully Appointment Updated")
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    const upcomingColumns = [
        {
            title: 'Patient Name',
            key: '1',
            width: 200,
            render: function (data) {
                return <>
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.firstName + ' ' + data?.lastName}</p>
                                <p className='p-0 m-0'>{data?.patient?.designation}</p>
                            </div>
                        </a>
                    </div>
                </>
            }
        },
        {
            title: 'Email',
            key: '2',
            width: 200,
            render: function (data) {
                return (
                    <div className='d-flex align-items-center'><span>{data.email}</span></div>
                )
            }
        },
        {
            title: 'App Date',
            key: '3',
            width: 200,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                )
            }
        },
        {
            title: 'Status',
            key: '4',
            width: 200,
            render: function (data) {
                return <div>{data?.status && data?.status === 'pending' ? 'Booking' : data?.status}</div>
            }
        },
        {
            title: 'Action',
            key: '5',
            // width: 500,
            render: function (data) {
                return (
                    <div className='d-flex gap-2 flex-wrap'>
                        <Link to={`/dashboard/appointments/${data?.id}`}>
                            <Button type="primary" icon={<FaEye />} size="medium">View</Button>
                        </Link>
                        <Button type="primary" icon={<FaEnvelope />} size="medium" onClick={() => openSendingMailModal(data)}>Mail</Button>
                        {
                            data.prescriptionStatus === 'notIssued'
                                ?
                                <Button
                                    type="primary"
                                    icon={<FaBriefcaseMedical />}
                                    size="medium"
                                    onClick={() => navigate(`/dashboard/appointment/treatment/${data?.id}`)}
                                >Treatment</Button>
                                :
                                <Link to={`/dashboard/prescription/${data?.prescription[0]?.id}`}>
                                    <Button type="primary" shape="circle" icon={<FaEye />} size="medium" />
                                </Link>
                        }
                        {
                            data?.status === 'pending' &&
                            <>
                                <Button type="primary" icon={<FaCheck />} size="medium" onClick={() => updatedApppointmentStatus(data, 'accept')}>Accept</Button>
                                <Button type='primary' icon={<FaTimes />} danger onClick={() => updatedApppointmentStatus(data, 'cancel')}>Cancel</Button>
                            </>
                        }
                    </div>
                )
            }
        },
    ];

    const items = [
        {
            key: '1',
            label: 'upcoming',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
        {
            key: '2',
            label: 'today',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
    ];

    return (
        <>
            <ModalSendMail showModal={showModal} setShowModal={setShowModal} data={selectedPatient} />
            <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />
        </>
    )
}

export default DashboardPage;