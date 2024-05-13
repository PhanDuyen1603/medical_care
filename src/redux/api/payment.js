import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const PAYMENT_URL = '/payment'

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPaymentChartData: build.query({
      query: () => ({
        url: `${PAYMENT_URL}/chart`,
        method: 'GET'
      }),
      providesTags: [tagTypes.payment]
    }),
  })
})

export const {
  useGetPaymentChartDataQuery,
} = paymentApi;