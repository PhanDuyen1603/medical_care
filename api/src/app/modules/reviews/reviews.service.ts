import { Reviews } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import calculatePagination, { IOption } from "../../../shared/paginationHelper";

const create = async (user: any, payload: Reviews): Promise<Reviews> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id: payload.doctorId
        }
    })
    if (isUserExist) {
        payload.patientId = isUserExist.id;
    }
    if (!isDoctorExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.reviews.create({
        data: payload
    })
    return result
}

const getAllReviews = async (options: IOption): Promise<Reviews[] | null> => {
    const limit = Number(options.limit) || 10;
    const result = await prisma.reviews.findMany({
        // take: limit,
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            }
        }
    });
    return result;
}

const getSingleReview = async (id: string): Promise<Reviews | null> => {
    const result = await prisma.reviews.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
}

const getDoctorReviews = async (id: string): Promise<Reviews[] | null> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: id
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.reviews.findMany({
        where: {
            doctorId: isUserExist.id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
}

const deleteReviews = async (id: string): Promise<Reviews> => {
    const result = await prisma.reviews.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateReview = async (id: string, payload: Partial<Reviews>): Promise<Reviews> => {
    const result = await prisma.reviews.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

const replyReviewByDoctor = async (user: any, id: string, payload: Partial<Reviews>): Promise<Reviews> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const result = await prisma.reviews.update({
        data: {
            response: payload.response
        },
        where: {
            id: id
        }
    })
    return result;
}

const countAllReviews = async () => {
    const listStar = ['1', '2', '3', '4', '5']
    const count = async (rating: any) => await prisma.reviews.count({
        where: {
            star: rating
        }
    })
    const countTotal = async () => await prisma.reviews.count()
    const promises = listStar.map(async (num) => {
        const response = await count(num);
        return response;
    });
    const result = await Promise.all([...promises, countTotal()]);
    const [rate1, rate2, rate3, rate4, rate5, total] = result
    return { rate1, rate2, rate3, rate4, rate5, total }
}

export const ReviewService = {
    create,
    getAllReviews,
    getDoctorReviews,
    deleteReviews,
    updateReview,
    getSingleReview,
    replyReviewByDoctor,
    countAllReviews
}