import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { faker } from '@faker-js/faker/locale/vi'
import { DoctorService } from "../doctor/doctor.service";
import { PatientService } from "../patient/patient.service";

const getRandomElement = (array: [string | number]) => {
  return array[Math.floor(Math.random() * array.length)];
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
    patients.push(newPatient)
  }
  return patients
}

const initExampleAppointments = async ({ doctors, patients }: any) => {

}

const InitSampleData = catchAsync(async (req: Request, res: Response) => {
  try {
    const doctorsExample = await initExampleDoctors(5)
    const patientsExample = await initExamplePatients(4)
    sendResponse(res, {
      statusCode: 200,
      message: 'Successfully Retrieve doctors !!',
      success: true,
      data: {
        doctorsExample,
        patientsExample
      },
    })
  } catch (error) {
    console.log({ error })
  }

})

export const InitController = {
  InitSampleData
}