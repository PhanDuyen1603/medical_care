import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { faker } from '@faker-js/faker/locale/vi'
import { DoctorService } from "../doctor/doctor.service";
import { PatientService } from "../patient/patient.service";
import { AppointmentService } from "../appointment/appointment.service";
import { doctorTimeSlot, reasons } from "../../../constants"
import { getRandomInt } from "../../../helpers/number"
import moment from "moment";

const NUMBER_DOCTOR_EXAMPLES = 10
const NUMBER_PATIENT_EXAMPLES = 120
const NUMBER_APPOINTMENT_WITH_PATIENTID_EXAMPLES = 500
const NUMBER_APPOINTMENT_WITH_NO_PATIENTID_EXAMPLES = 800

const getRandomElement = (array: any) => {
  return array[Math.floor(Math.random() * array.length)];
}

const getRandomDate = (isOutOfDate: boolean) => {
  if (isOutOfDate) return moment().subtract(getRandomInt(1, 30), 'd').format('YYYY-MM-DD HH:mm:ss')
  return moment().add(getRandomInt(0, 5), 'd').format('YYYY-MM-DD HH:mm:ss')
}

const initExampleDoctors = async (number: number) => {
  let doctors = []
  const doctorsExample = Array.from({ length: number }).map(_ => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      gender: faker.person.sex(),
      price: faker.number.int({ min: 800, max: 1000 }) + ''
    }
    return testData
  })
  for (const doctor of doctorsExample) {
    const newDoc = await DoctorService.create(doctor);
    doctors.push(newDoc)
  }
  return doctors
}

const initExamplePatients = async (number: number) => {
  let patients = []
  const patientsExample = Array.from({ length: number }).map(_ => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      gender: faker.person.sex(),
    }
    return testData
  })
  for (const patient of patientsExample) {
    const newPatient = await PatientService.createPatient(patient);
    patients.push(newPatient.patient)
  }
  return patients
}

const initExampleAppointments = async ({ doctors, patients }: any) => {
  // 500 records with exist patients - done
  // 800 records new patient - not have userId
  // 800 records pending
  // 500 records out of date
  let appointments = []
  const newAppointmentsWithExistPatient = Array.from({ length: NUMBER_APPOINTMENT_WITH_PATIENTID_EXAMPLES }).map(_ => {
    const doctor: any = getRandomElement(doctors);
    const patient: any = getRandomElement(patients);
    const scheduleTime = getRandomElement(doctorTimeSlot)
    const reasonForVisit = getRandomElement(reasons)
    return {
      patientInfo: {
        patientId: patient.id || '',
        doctorId: doctor.id || '',
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        email: patient.email || '',
        phone: patient.phone || '',
        reasonForVisit,
        description: reasonForVisit,
        address: patient.address || '',
        scheduleDate: getRandomDate(!!Math.round(Math.random())) || '',
        scheduleTime: scheduleTime || '',
      },
      payment: {
        paymentMethod: 'paypal' || '',
        paymentType: 'creditCard' || '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
      }
    }
  })
  const newAppointmentsWithUnSignedPatient = Array.from({ length: NUMBER_APPOINTMENT_WITH_NO_PATIENTID_EXAMPLES }).map(_ => {
    const doctor: any = getRandomElement(doctors);
    const scheduleTime = getRandomElement(doctorTimeSlot)
    const reasonForVisit = getRandomElement(reasons)
    return {
      patientInfo: {
        patientId: undefined,
        doctorId: doctor.id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        reasonForVisit,
        description: reasonForVisit,
        scheduleDate: getRandomDate(!!Math.round(Math.random())) || '',
        scheduleTime: scheduleTime || '',
      },
      payment: {
        paymentMethod: 'paypal' || '',
        paymentType: 'creditCard' || '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
      }
    }
  })
  for (const appointment of newAppointmentsWithExistPatient) {
    const newAppointment = await AppointmentService.createAppointment(appointment);
    appointments.push(newAppointment)
  }
  for (const appointment of newAppointmentsWithUnSignedPatient) {
    const newAppointment = await AppointmentService.createAppointment(appointment);
    appointments.push(newAppointment)
  }
  console.log({ appointments })
  return appointments
}

const InitSampleData = catchAsync(async (req: Request, res: Response) => {
  try {
    const doctorsExample = await initExampleDoctors(NUMBER_DOCTOR_EXAMPLES)
    const patientsExample = await initExamplePatients(NUMBER_PATIENT_EXAMPLES)
    const appointmentExample = await initExampleAppointments({
      doctors: doctorsExample,
      patients: patientsExample
    })
    sendResponse(res, {
      statusCode: 200,
      message: 'Successfully Retrieve doctors !!',
      success: true,
      data: {
        doctorsExample,
        patientsExample,
        appointmentExample
      },
    })
  } catch (error) {
    console.log({ error })
  }

})

export const InitController = {
  InitSampleData
}