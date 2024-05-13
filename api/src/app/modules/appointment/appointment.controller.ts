import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { Appointments, Patient } from "@prisma/client";
import pick from "../../../shared/pick";
import moment from "moment";
import { AppointmentsOptions, IAppointmentFilters, IDateRangeOptions } from './appointment.interface'

const createAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.createAppointment(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    })
})
const createAppointmentByUnAuthenticateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.createAppointmentByUnAuthenticateUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    })
})


const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
    const { start_date, end_date } = req.query
    const filter: IAppointmentFilters = {
        start_date: typeof start_date === 'string' ? start_date : undefined,
        end_date: typeof end_date === 'string' ? end_date : undefined,
    };
    const options = pick(req.query, AppointmentsOptions);
    const result = await AppointmentService.getAllAppointments(filter, options);
    sendResponse<Appointments[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Appointment !!',
        success: true,
        data: result,
    })
})

const getAppointmentDataFromRange = catchAsync(async (req: Request, res: Response) => {
    const { date, range, isOldPatient } = req.query
    const filter: IDateRangeOptions = {
        date: date && typeof date === 'string' ? date : moment().format('YYYY-MM-DD'),
        range: range && typeof range === 'string' && ['7days', '1month'].includes(range) ? range : '7days',
        isOldPatient: isOldPatient && typeof isOldPatient === 'boolean' ? isOldPatient : false,
    };
    const result = await AppointmentService.countAppointments(filter)
    sendResponse<Appointments[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve chart data !!',
        success: true,
        data: result,
    })
})

const getAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAppointment(req.params.id);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    })
})

const getAppointmentByTrackingId = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAppointmentByTrackingId(req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    })
})

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.deleteAppointment(req.params.id);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Appointment !!',
        success: true,
        data: result,
    })
})

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointment(req.params.id, req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    })
})

const getPatientAppointmentById = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPatientAppointmentById(req.user);
    sendResponse<Appointments[]>(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    })
})

const getDoctorAppointmentsById = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getDoctorAppointmentsById(req.user, req.query);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctor apppointments !!',
        success: true,
        data: result
    })
})

const updateAppointmentByDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointmentByDoctor(req.user, req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully updated apppointments !!',
        success: true,
        data: result
    })
})

const getDoctorPatients = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getDoctorPatients(req.user);
    sendResponse<Patient[]>(res, {
        statusCode: 200,
        message: 'Successfully retrieve doctor patients !!',
        success: true,
        data: result
    })
})

const getPaymentInfoViaAppintmentId = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPaymentInfoViaAppintmentId(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    })
})

const getPatientPaymentInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPatientPaymentInfo(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    })
})

const getDoctorInvoices = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getDoctorInvoices(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve Doctor info !!',
        success: true,
        data: result
    })
})

export const AppointmentController = {
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getPatientAppointmentById,
    updateAppointment,
    createAppointment,
    getAllAppointment,
    getAppointment,
    deleteAppointment,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId,
    // 
    getAppointmentDataFromRange
}