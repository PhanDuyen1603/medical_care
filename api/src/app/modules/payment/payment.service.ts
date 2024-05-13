import { Appointments, Patient, Payment, paymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import moment from 'moment';
import * as path from 'path';
import { AppointmentService } from '../appointment/appointment.service'

const getPaymentsInfo = async (payload: any) => {
  const { start_date = '05/07/2024', end_date = '05/12/2024' } = payload
  const appointments = await AppointmentService.getAllAppointments({
    start_date,
    end_date,
  }, { limit: 1000 })

  const appointmentIds = appointments?.map(x => x.id)

  const paymentList = await prisma.payment.findMany({
    where: {
      appointmentId: { in: appointmentIds },
    },
    include: {
      appointment: {
        select: {
          trackingId: true,
          firstName: true,
          lastName: true,
          scheduleDate: true
        }
      }
    }
  })
  return paymentList
}

const getTotalPaymentByDates = async (payload: any) => {
  const payments = await getPaymentsInfo({})
  let res: any = {}
  if (payments && payments.length > 0) {
    for (let index = 0; index < payments.length; index++) {
      const data = payments[index]
      const appointmentDate = data.appointment.scheduleDate?.split(' ')[0]
      if (appointmentDate) {
        if (!res[appointmentDate]) {
          res[appointmentDate] = +data.totalAmount
        } else {
          res[appointmentDate] = res[appointmentDate] + +data.totalAmount
        }
      }
    }
  }
  console.log({ res })
  return res
}

export const PaymentService = {
  getTotalPaymentByDates,
  getPaymentsInfo
}
