export const getPatientName = (patient) => {
  if (patient?.patient?.firstName || patient?.patient?.lastName) return `${patient?.patient?.firstName} ${patient?.patient?.lastName}`
  return `${patient?.firstName} ${patient?.lastName}`
}

export const getPatieentAddress = (patient) => {
  if (patient?.patient?.address) return `${patient?.patient?.address && patient?.patient?.address}, 
    ${patient?.patient?.city && patient?.patient?.city}<br /> 
    ${patient?.patient?.state}, 
    ${patient?.patient?.country && patient?.patient?.country}`
  return patient.address
}