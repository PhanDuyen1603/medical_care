import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const MAIL_URL = "/mail"

export const mailApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMail: build.mutation({
      query: (data) => ({
        url: `${MAIL_URL}`,
        method: "POST",
        data: data,
      }),
    }),
  }),
})

export const {
  useSendMailMutation,
} = mailApi