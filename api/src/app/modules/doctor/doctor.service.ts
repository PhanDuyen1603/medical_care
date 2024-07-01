import { Doctor, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { DoctorSearchableFields, IDoctorFilters, IDoctorFiltersWithAppointment, doctorSpecialists } from "./doctor.interface";
import calculatePagination, { IOption } from "../../../shared/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import moment from "moment";
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from "path";
const { v4: uuidv4 } = require('uuid');

const sendVerificationEmail = async (data: Doctor) => {
    const currentUrl = process.env.NODE_ENV === 'production' ? 'https://doctor-on-call-backend.vercel.app/api/v1/auth/' : 'http://localhost:5001/api/v1/auth/';
    const uniqueString = uuidv4() + data.id;
    const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);
    const url = `${currentUrl}user/verify/${data.id}/${uniqueString}`
    const expiresDate = moment().add(6, 'hours')
    const verficationData = await prisma.userVerfication.create({
        data: {
            userId: data.id,
            expiresAt: expiresDate.toDate(),
            uniqueString: uniqueStringHashed
        }
    })
    if (verficationData) {
        const pathName = path.join(__dirname, '../../../../template/verify.html',)
        const obj = { link: url };
        const subject = "Email Verification"
        const toMail = data.email;
        try {
            await EmailtTransporter({ pathName, replacementObj: obj, toMail, subject })
        } catch (err) {
            console.log(err);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to send email !');
        }
    }
}

const create = async (payload: any): Promise<any> => {
    const data = await prisma.$transaction(async (tx) => {
        const { password = 'P@ssw0rd1', ...othersData } = payload;
        const existEmail = await tx.auth.findUnique({ where: { email: othersData.email } });

        if (existEmail) {
            throw new Error("Email Already Exist !!")
        }
        const doctor = await prisma.doctor.create({ data: othersData });
        await prisma.auth.create({
            data: {
                email: doctor.email,
                password: password && await bcrypt.hashSync(password, 12),
                role: UserRole.doctor,
                userId: doctor.id
            },
        });
        return doctor
    });
    // TODO: move this to patient
    // if (data.id) {
    //     await sendVerificationEmail(data)
    // }
    return data;

}

const getAllDoctors = async (filters: IDoctorFilters, options: IOption): Promise<IGenericResponse<Doctor[]>> => {
    const { limit, page, skip } = calculatePagination(options);
    const { searchTerm, max, min, specialist, gender, ...filterData } = filters;
    let andCondition: any[] = [];
    let orCondition: any[] = [];
    if (searchTerm) {
        DoctorSearchableFields.map((field) => {
            orCondition.push({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            })
        })
    }

    if (Object.keys(filterData).length > 0) {
        const conditions = Object.entries(filterData).map(([key, value]) => ({
            [key]: { equals: value }
        }))
        andCondition = [...andCondition, ...conditions]
    }

    if (min && max) {
        andCondition.push({
            price: {
                gt: parseInt(min),
                lt: parseInt(max)
            }
        })
    }

    if (specialist) {
        andCondition.push({
            services: {
                contains: specialist,
                mode: "insensitive"
            }
        })
    }

    if (gender && ['male', 'female'].includes(gender)) {
        andCondition.push({
            gender: {
                equals: gender
            }
        })
    }
    let whereCondition: any = {
        AND: andCondition || []
    }
    if (orCondition.length > 0) {
        whereCondition.AND.push({
            OR: orCondition
        })
    }
    const result = await prisma.doctor.findMany({
        skip,
        take: limit,
        where: whereCondition,
    });
    const total = await prisma.doctor.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}

const getDoctor = async (id: string): Promise<Doctor | null> => {
    const result = await prisma.doctor.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const countDoctors = async () => {
    let result: any = {}
    result.total = await prisma.doctor.count();
    for (let index = 0; index < doctorSpecialists.length; index++) {
        const element = doctorSpecialists[index];
        result[doctorSpecialists[index].value] = await prisma.doctor.count({
            where: {
                services: {
                    contains: element.value
                }
            }
        })
    }
    return result;
}

const deleteDoctor = async (id: string): Promise<any> => {
    const result = await prisma.$transaction(async (tx) => {
        const patient = await tx.doctor.delete({
            where: {
                id: id
            }
        });
        await tx.auth.delete({
            where: {
                email: patient.email
            }
        })
    });
    return result;
}

const updateDoctor = async (req: Request): Promise<Doctor> => {
    const file = req.file as IUpload;
    const id = req.params.id as string;
    let user = req.body.data ? req.body.data : req.body
    if (typeof user === 'string') user = JSON.parse(user);
    if (file) {
        const uploadImage = await CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            user.img = uploadImage.secure_url
        } else {
            throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to Upload Image');
        }
    }
    const result = await prisma.doctor.update({
        where: { id },
        data: user
    })
    return result;
}

const getDoctorsAvaliable = async (filters: IDoctorFiltersWithAppointment, options: IOption) => {
    const { limit, page, skip } = calculatePagination(options);
    const { specialist, appointmentDate, time } = filters;
    // TODO: get doctors by date and time

    const doctorsBySpecialist = await getAllDoctors({ specialist }, { limit: 1000 })
    const data = [...doctorsBySpecialist.data];
    const res = []
    if (data && Array.isArray(data) && data.length > 0) {
        const ids = data.map(x => x.id)
        for (let i = 0; i < ids.length; i++) {
            const p = await prisma.appointments.count({
                where: {
                    doctorId: ids[i],
                    scheduleTime: {
                        contains: time.toLocaleLowerCase()
                    },
                    scheduleDate: {
                        contains: moment(appointmentDate).format('YYYY-MM-DD').toString()
                    }
                }
            })
            const index = data.findIndex(x => x.id === ids[i])
            if (p < 4) res.push({ ...data[index] })

            // res[index] = {
            //     ...data[index],
            //     appointmentAvailable: p && p < 4 ? true : false,
            //     appointmentsCount: p
            // }
        }
    }
    return {
        meta: {
            page,
            limit,
            total: doctorsBySpecialist.data.length,
        },
        data: res
    }

}

export const DoctorService = {
    create,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor,
    getDoctorsAvaliable,
    countDoctors
}