import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const SPE_URL = '/specialist'

export const specialistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialist: build.mutation({
      query: ({ data }) => ({
        url: `${SPE_URL}`,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'multipart/form-data',
        },
      }),
      invalidatesTags: [tagTypes.specialist]
    }),
    getSpecialists: build.query({
      query: () => ({
        url: `${SPE_URL}`,
        method: 'GET'
      }),
      transformResponse: (response) => {
        return {
          specialists: response.data,
          meta: response.meta
        }
      },
      providesTags: [tagTypes.specialist]
    }),
    updateSpecialist: build.mutation({
      query: ({ data, id }) => ({
        url: `${SPE_URL}/${id}`,
        method: 'PATCH',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: [tagTypes.specialist]
    }),
    removeSpecialist: build.mutation({
      query: (id) => ({
        url: `${SPE_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tagTypes.specialist]
    })
  })
})

export const {
  useCreateSpecialistMutation,
  useGetSpecialistsQuery,
  useUpdateSpecialistMutation, 
  useRemoveSpecialistMutation 
} = specialistApi