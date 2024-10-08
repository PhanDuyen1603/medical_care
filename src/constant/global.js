import dayjs from 'dayjs';
export const bloodGrup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
export const bloodGrupOptions = bloodGrup.map((data) => {
    return {
        label: data,
        value: data
    }
})

const gender = ['male', 'female']

export const genderOptions = gender.map((data) => {
    return {
        label: data,
        value: data
    }
})
export const daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

// icons https://www.flaticon.com/packs/medical-specialties-3
export const doctorSpecialistArray = [
    // tim mach
    { id: 1, value: "Cardiologist", img: 'Cardiologist' },
    // da lieu
    { id: 2, value: "Dermatologist", img: 'Dermatologist' },
    // chan thuong chinh hinh
    { id: 3, value: "Orthopedic Surgeon", img: 'Orthopedic Surgeon' },
    // phụ khoa
    { id: 4, value: "Gynecologist", img: 'Gynecologist' },

    { id: 5, value: "Neurologist", img: 'Neurologist' },
    // nhãn khoa
    { id: 6, value: "Ophthalmologist", img: 'Ophthalmologist' },
    // nhi khoa
    { id: 7, value: "Pediatrician", img: 'Pediatrician' },
    // nội tiết
    { id: 8, value: "Endocrinologist", img: 'Endocrinologist' },
    // tiêu hóa
    { id: 9, value: "Gastroenterologist", img: 'Gastroenterologist' },
    // phổi
    { id: 10, value: "Pulmonologist", img: 'Pulmonologist' },
    // chỉnh hình
    { id: 11, value: "Orthopedic", img: 'Orthopedic' }
]

export const doctorSpecialistOptions = doctorSpecialistArray.map(data => {
    return {
        label: data.value,
        value: data.value,
        img: data.img
    }
});

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

const appointmentStatus = [
    "pending",
    "scheduled",
    "cancel",
    "confirmed",
    "InProgress",
    "Completed",
    "FollowUp",
    "archived"
]

export const statusColor = {
    pending: "#f50",
    scheduled: "#108ee9",
    cancel: "#f51124",
    confirmed: "#87d068",
    InProgress: "#2db7f5",
    Completed: "#87d068",
    FollowUp: "#2db7f5",
    archived: "#2db7f5"
}

export const paymentStatusColor = {
    paid: "#87d068",
    unpaid: "#f51124"
}

export const prescriptionStatusColor = {
    issued: "#87d068",
    notIssued: "#2db7f5"
}


export const appointemntStatusOption = appointmentStatus.map((item) => {
    return {
        label: item,
        value: item,
        text: item === 'pending' ? 'booking' : item
    }
})

//Daignosis

const medical_diagnoses = [
    "Hypertension",
    "Type 2 Diabetes Mellitus",
    "Coronary Artery Disease",
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Asthma",
    "Chronic Kidney Disease",
    "Migraine",
    "Major Depressive Disorder",
    "Generalized Anxiety Disorder",
    "Schizophrenia",
    "Bipolar Disorder",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    "Thyroid Disorders (e.g., Hypothyroidism, Hyperthyroidism)",
    "Gastroesophageal Reflux Disease (GERD)",
    "Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Chronic Hepatitis",
    "Cirrhosis of the Liver",
    "Stroke",
    "Epilepsy",
    "Chronic Heart Failure"
]
const medical_diseases = [
    "Hypertension",
    "Type 2 Diabetes Mellitus",
    "Coronary Artery Disease",
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Asthma",
    "Chronic Kidney Disease",
    "Migraine",
    "Major Depressive Disorder",
    "Generalized Anxiety Disorder",
    "Schizophrenia",
    "Bipolar Disorder",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    "Thyroid Disorders (e.g., Hypothyroidism, Hyperthyroidism)",
    "Gastroesophageal Reflux Disease (GERD)",
    "Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Chronic Hepatitis",
    "Cirrhosis of the Liver",
    "Stroke",
    "Epilepsy",
    "Chronic Heart Failure",
    "Obesity",
    "Arthritis",
    "Dementia",
    "Psoriasis",
    "Celiac Disease"
];

const medicalCheckupList = [
    "Physical Examination",
    "Blood Pressure Measurement",
    "Blood Tests",
    "Cholesterol Panel",
    "Blood Glucose Test",
    "Complete Blood Count (CBC)",
    "Thyroid Function Tests",
    "Liver Function Tests",
    "Kidney Function Tests",
    "Urinalysis",
    "Body Mass Index (BMI) Measurement",
    "Vision Test",
    "Hearing Test",
    "Dental Checkup",
    "Skin Examination",
    "Cancer Screenings (e.g., Mammogram, Pap Smear, Prostate Specific Antigen)",
    "Bone Density Test",
    "Electrocardiogram (ECG or EKG)",
    "Chest X-ray",
    "Pulmonary Function Tests",
    "Colonoscopy",
    "Stool Test for Colorectal Cancer",
    "DEXA Scan (Dual-Energy X-ray Absorptiometry)",
    "HIV Test",
    "Sexually Transmitted Infections (STI) Screenings",
    "Immunizations and Vaccinations",
    "Eye Exam",
    "Psychological Assessment",
    "Annual Checkup with General Practitioner"
];

const dosageList = [
    "250 mg",
    "1000 mg",
    "75 mg",
    "50 mg",
    "5 mg",
    "150 mg",
    "300 mg",
    "200 mg",
    "10 mg",
    "20 mg"
];
const frequenciesList = [
    "Once Daily (QD)",
    "Twice Daily (BID)",
    "Three Times Daily (TID)",
    "Four Times Daily (QID)",
    "Every 6 Hours (Q6H)",
    "As Needed (PRN)",
    "Once Every Other Day (QOD)",
    "Every 8 Hours (Q8H)",
    "Every 12 Hours (Q12H)",
    "Once Weekly (QW)"
];

const patientStatusList = [
    "Stable",
    "Critical",
    "Serious",
    "Guarded",
    "Unstable",
    "Recovering",
    "Critical but Stable",
    "Comfort Measures Only (CMO)",
    "Acute",
    "Chronic"
];

export const PatientStatus = patientStatusList.map((item) => {
    return {
        label: item,
        value: item
    }
})



export const DiagnosisOptions = medical_diagnoses.map((item) => {
    return { label: item, value: item }
})

export const DiseaseOptions = medical_diseases.map((item) => {
    return { label: item, value: item }
})

export const MedicalCheckupOptions = medicalCheckupList.map((item) => {
    return { label: item, value: item }
})

export const DosageOptions = dosageList.map((item) => {
    return {
        label: item,
        value: item
    }
})

export const FrequencyOptions = frequenciesList.map((item) => {
    return {
        label: item,
        value: item
    }
})

export const DateRangePresets = [
    {
        label: 'Next 3 Days',
        value: [dayjs(), dayjs().add(3, 'd')],
    },
    {
        label: 'Next 7 Days',
        value: [dayjs(), dayjs().add(7, 'd')],
    },
    {
        label: 'Next 10 Days',
        value: [dayjs(), dayjs().add(10, 'd')],
    },
    {
        label: 'Next 14 Days',
        value: [dayjs(), dayjs().add(14, 'd')],
    },
    {
        label: 'Next 30 Days',
        value: [dayjs(), dayjs().add(30, 'd')],
    },
    {
        label: 'Next 2 Month',
        value: [dayjs(), dayjs().add(60, 'd')],
    },
    {
        label: 'Next 3 Month',
        value: [dayjs(), dayjs().add(90, 'd')],
    },
];

export const DatePickerSinglePresets = [
    {
        label: 'Tomorrow',
        value: dayjs().add(1, 'd'),
    },
    {
        label: 'Next 3 Day',
        value: dayjs().add(3, 'd'),
    },
    {
        label: 'Next Week',
        value: dayjs().add(7, 'd'),
    },
    {
        label: 'Next 2 Week',
        value: dayjs().add(15, 'd'),
    },
    {
        label: 'Next Month',
        value: dayjs().add(30, 'd'),
    },
    {
        label: 'Next 2 Month',
        value: dayjs().add(60, 'd'),
    },
    {
        label: 'Next 3 Month',
        value: dayjs().add(90, 'd'),
    },
    {
        label: 'Next 6 Month',
        value: dayjs().add(180, 'd'),
    },
]