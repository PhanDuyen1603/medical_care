import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const ADMIN_URL = '/admin'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmins: build.query({
      query: (args) => ({
        url: `${ADMIN_URL}`,
        method: 'GET',
        params: args
      }),
      transformResponse: (response) => {
        return {
          admins: response.data,
          meta: response.meta
        }
      },
      providesTags: [tagTypes.admin]
    }),
    getAdmin: build.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: [tagTypes.admin]
    }),
    updateAdmin: build.mutation({
      query: ({data, id}) => ({
        url: `${ADMIN_URL}/${id}`,
        method: 'PATCH',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      providesTags: [tagTypes.admin]
    })
  })
})

export const { 
  useGetAllAdminsQuery,
  useGetAdminQuery,
  useUpdateAdminMutation 
} = adminApi