export type IDoctorFilters = {
    searchTerm?: string;
    firstName?: string;
    gender?: string;
    city?: string;
    max?: string;
    min?: string;
    specialist?: string;
    appointmentAvailable?: boolean;
}
export type IDoctorFiltersWithAppointment = {
    specialist: string;
    appointmentDate: Date | string;
    time: string;
}

export const IDoctorFiltersData = ['searchTerm', 'firstName', 'lastName', 'gender', 'city', 'max', 'min', 'specialist']
export const IDoctorFiltersWithAppointmentData = ['specialist', 'appointmentDate', 'time']
export const IDoctorOptions = ['limit', 'page', 'sortBy', 'sortOrder']

export const DoctorSearchableFields = ['firstName', 'lastName', 'address', 'specialization', 'degree']
export const doctorSpecialists = [
    // tim mach
    { id: 1, value: "Cardiologist" },
    // da lieu
    { id: 2, value: "Dermatologist" },
    // chan thuong chinh hinh
    { id: 3, value: "Orthopedic Surgeon" },
    // phụ khoa
    { id: 4, value: "Gynecologist" },

    { id: 5, value: "Neurologist" },
    // nhãn khoa
    { id: 6, value: "Ophthalmologist" },
    // nhi khoa
    { id: 7, value: "Pediatrician" },
    // nội tiết
    { id: 8, value: "Endocrinologist" },
    // tiêu hóa
    { id: 9, value: "Gastroenterologist" },
    // phổi
    { id: 10, value: "Pulmonologist" },
    // chỉnh hình
    { id: 11, value: "Orthopedic" }
]