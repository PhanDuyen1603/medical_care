import { Request, Response } from 'express';
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from './admin.service'
import { Admin } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAdmin(req.params.id);
  sendResponse<Admin>(res, {
      statusCode: 200,
      message: 'Successfully Get Admin !!',
      success: true,
      data: result,
  })                                                                                                                                                                                                                                                                                                             
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  
})

const AdminRegister = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.create(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: 'Successfully Register Admin!!',
    success: true,
    data: result
  })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.remove(req.params.id);
  sendResponse<Admin>(res, {
    statusCode: 200,
    message: 'Successfully Deleted Admin!!',
    success: true,
    data: result
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.update(req)
  sendResponse<Admin>(res, {
    statusCode: 200,
    message: 'Successfully Updated Doctor !!',
    success: true,
    data: result,
  })
})

export const AdminController = {
  AdminRegister,
  deleteAdmin,
  updateAdmin,
  getAdmin
}