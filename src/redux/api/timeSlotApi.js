import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const TIMELOT_URL = '/timeslot'

export const timeSlotApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTimeSlot: build.mutation({
            query: ({ data }) => ({
                url: `${TIMELOT_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
        getAllTimeSlot: build.query({
            query: (arg) => ({
                url: `${TIMELOT_URL}/`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        getTimeSlot: build.query({
            query: (id) => ({
                url: `${TIMELOT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        getAppointmentTime: build.query({
            query: ({ day, id }) => ({
                url: `${TIMELOT_URL}/appointment-time/${id}`,
                method: 'GET',
                params: { day: day }
            }
            ),
            providesTags: [tagTypes.timeSlot]
        }),
        getAllAppointmentTimes: build.query({
            query: ({ day, id }) => ({
                url: `${TIMELOT_URL}/appointment-times/${id}`,
                method: 'GET',
            }
            ),
            providesTags: [tagTypes.timeSlot]
        }),
        getDoctorTimeSlot: build.query({
            query: (arg) => ({
                url: `${TIMELOT_URL}/my-slot`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.timeSlot]
        }),
        deleteTimeSlot: build.mutation({
            query: (id) => ({
                url: `${TIMELOT_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
        deleteTimeSchedule: build.mutation({
            query: (id) => ({
                url: `${TIMELOT_URL}/schedule/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
        UpdateTimeSlot: build.mutation({
            query: (data) => ({
                url: `${TIMELOT_URL}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.timeSlot]
        }),
    })
})

export const {
    useGetAllTimeSlotQuery,
    useDeleteTimeSlotMutation,
    useDeleteTimeScheduleMutation,
    useGetDoctorTimeSlotQuery,
    useGetTimeSlotQuery,
    useUpdateTimeSlotMutation,
    useCreateTimeSlotMutation,
    useGetAppointmentTimeQuery,
    useGetAllAppointmentTimesQuery
} = timeSlotApi;