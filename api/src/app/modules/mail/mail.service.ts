import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from "path";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const sendingMesssage = async (payload: any) => {
  const { email, title, message } = payload.data;
  const pathName = path.join(__dirname, '../../../../template/message.html',)
  const subject = "Message"
  const toMail = email;
  try {
    await EmailtTransporter({ pathName, replacementObj: { email, title, message }, toMail, subject })
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to send email !');
  }
}

export const MailService = {
  sendingMesssage
}