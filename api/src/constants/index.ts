import { IBloodGroup } from "../interfaces/common";

export const BloodGroup: IBloodGroup[] = ['O+', 'O-', 'B+', 'B-', 'AB+', 'AB-', 'A+', 'A-']
export const patientCondition: string[] = ["Critical", "Serious", "Stable", "Acute", "Chronic", "Critical but Stable", "Non-Critical", "Terminal", "Emergent", "Urgent"];
export const IAuthRules = ['ADMIN', "PATIENT", "DOCTOR"]

export const IOptions = ['limit', 'page', 'sortBy', 'sortOrder']

export const doctorTimeSlot = [
  "08:00 AM",
  "08:15 AM",
  "08:30 AM",
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "05:00 PM",
  "05:15 PM"
]

export const scheduleDateFormat = 'YYYY-MM-DD HH:mm:ss'

export const reasons = [
  'Skin Disorders',
  'Joint Pain And Osteoarthritis',
  'Back Problems',
  'Upper Respiratory Problems',
  'Anxiety, Bipolar Disorder And Depression',
  'Chronic Neurology Disorders',
  'Headaches And Migraines',
  'Broken leg',
  'Eye Problems',
  'Heart Problems',
  'Muscle Problems',
  'Nervous System Problems',
  'Skin Problems',
  'Broken arm',
]