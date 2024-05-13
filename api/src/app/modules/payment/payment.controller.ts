import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { Payment } from "@prisma/client";
import pick from "../../../shared/pick";
import moment from "moment";

const testPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getTotalPaymentByDates({});

  sendResponse(res, {
    statusCode: 200,
    message: 'Successfully Appointment Created !!',
    success: true,
    data: result
  })
})

export const PaymentController = {
  testPayment
}