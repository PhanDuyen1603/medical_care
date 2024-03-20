import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SpecialistService } from "./specialist.service";
import httpStatus from "http-status";

const createSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialistService.create(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully Specialist Created!!',
    success: true,
    data: result
  })
})

const getAllSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialistService.getAll()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully Specialist Retrived!!',
    success: true,
    data: result
  })
})

const updateSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialistService.updateSpecialist(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully Specialist Updated!!',
    success: true,
    data: result
  })
})

const deleteSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialistService.deleteSpecialist(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully Specialist Deleted!!',
    success: true,
    data: result
  })
})

export const SpecialistController = {
  createSpecialist,
  getAllSpecialist,
  updateSpecialist,
  deleteSpecialist
}