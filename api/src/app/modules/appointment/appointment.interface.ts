export type IAppointmentFilters = {
  searchTerm?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
  isOldPatient?: boolean;
}
export type IDateRangeOptions = {
  date: string;
  range?: string;
  isOldPatient?: boolean;
}
export const AppointmentsFilterable = ['trackingId', 'scheduleDate', 'status']
export const AppointmentsSearchable = ['scheduleDate']
export const AppointmentsOptions = ['limit', 'page', 'sortBy', 'sortOrder']