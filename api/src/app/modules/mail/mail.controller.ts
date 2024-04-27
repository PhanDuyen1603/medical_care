import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MailService } from "./mail.service";

const sendingEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await MailService.sendingMesssage(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: 'Successfully sending mail !!',
    success: true,
    data: result
  })
})

export const MailController = {
  sendingEmail
}