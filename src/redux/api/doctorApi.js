import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const DOC_URL = '/doctor'

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query({
            query: (arg) => ({
                url: `${DOC_URL}`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) => {
                return {
                    doctors: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.doctor]
        }),
        getDoctorsAvailable: build.query({
            query: (arg) => ({
                url: `${DOC_URL}/available`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) => {
                console.log(JSON.stringify(response))
                return {
                    doctors: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.doctor]
        }),
        getDoctor: build.query({
            query: (id) => ({
                url: `${DOC_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        getCountDoctors: build.query({
            query: () => ({
                url: `${DOC_URL}/count`,
                method: 'GET'
            }),
            providesTags: [tagTypes.doctor]
        }),
        updateDoctor: build.mutation({
            query: ({ data, id }) => ({
                url: `${DOC_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        deleteDoctor: build.mutation({
            query: (id) => ({
                url: `${DOC_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.doctor]
        })
    })
})

export const {
    useGetDoctorsQuery,
    useGetDoctorsAvailableQuery,
    useGetDoctorQuery,
    useGetCountDoctorsQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation
} = doctorApi