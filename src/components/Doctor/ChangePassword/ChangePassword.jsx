import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { useForm } from 'react-hook-form';
import { Toast, ToastContainer } from 'react-bootstrap';
import useAuthCheck from '@/redux/hooks/useAuthCheck';
import { Button } from 'antd';
import './ChangePassword.css'

const ChangePassword = () => {
    const [userEmail, setUserEmail] = useState('');
    const [toastShow, setToastShow] = useState({
        show: false,
        variant: 'info',
        message: 'loading...',
    })
    const { data, role } = useAuthCheck();
    const [updatePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation()
    const { register, handleSubmit, getValues, watch, formState: { errors }, reset } = useForm({});
    const onSubmit = (submit) => {
        const { oldPassword, newPassword } = submit
        updatePassword({ oldPassword, newPassword, email: userEmail, role })
        reset();
    };

    useEffect(() => {
        if (data) {
            const { id, services, email } = data;
            setUserEmail(email);
        };
    }, [data]);

    useEffect(() => {
        if (isLoading) setToastShow({
            show: true,
            variant: 'info',
            message: 'loading...',
        })
        if (!isLoading && isError) {
            setToastShow({
                show: true,
                variant: 'danger',
                message: error?.data?.message,
            })
        }
        if (!isLoading && isSuccess) {
            setToastShow({
                show: true,
                variant: 'success',
                message: 'Successfully Password Changed',
            })
        }
        setTimeout(() => {
            setToastShow({
                show: false,
                variant: 'info',
                message: 'loading...',
            })
        }, 3000);
    }, [isLoading, isSuccess, isError])

    return (
        <DashboardLayout>
            <ToastContainer position="top-end">
                {
                    <Toast delay={3000} show={toastShow.show} bg={toastShow.variant}>
                        <Toast.Body>
                            <div className='rounded text-white'>
                                {toastShow.message}
                            </div>
                        </Toast.Body>
                    </Toast>
                }
            </ToastContainer>
            <div className="w-100 mb-3 rounded p-2" style={{ background: '#f8f9fa' }}>
                <h5 className='text-title mt-3'>Change Your Password</h5>
                <form className='container row form-row px-5 mx-auto my-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>Old Password</label>
                            <input type="password" defaultValue={data?.oldPassword} {...register("oldPassword", { required: true })} placeholder='Old Password' className="form-control" />
                            {errors?.oldPassword?.type === "required" && <p className='error-mess'>This field is required</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>New Password</label>
                            <input type="password" defaultValue={data?.newPassword} {...register("newPassword", { required: true })} placeholder='New Password' className="form-control" />
                            {errors?.newPassword?.type === "required" && <p className='error-mess'>This field is required</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                defaultValue={data?.confirmPassword}
                                {...register("confirmPassword", { required: true })}
                                placeholder='Confirm Password'
                                className="form-control" />
                            {errors?.confirmPassword?.type === "required" && <p className='error-mess'>This field is required</p>}
                            {
                                watch("confirmPassword") !== watch("newPassword") &&
                                    getValues("confirmPassword") ? (
                                    <p className='error-mess'>password not match</p>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <Button htmlType='submit' type="primary" disabled={watch("confirmPassword") !== watch("newPassword")} size='large'>Save Changes</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default ChangePassword;