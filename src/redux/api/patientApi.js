import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/patient'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        getPatients: build.query({
            query: (arg) => ({
                url: `${PAT_URL}`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.patient]
        }),
        getCountPatients: build.query({
            query: () => ({
                url: `${PAT_URL}/count`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: ({ data, id }) => ({
                url: `${PAT_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.patient]
        })
    })
})

export const {
    useGetPatientQuery,
    useGetPatientsQuery,
    useGetCountPatientsQuery,
    useUpdatePatientMutation
} = patientApi