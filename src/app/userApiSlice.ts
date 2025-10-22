import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './config'
import {
  IUpdatedPassword,
  IUpdatePasswordResponse,
  IUserDataResponse,
} from './types'
import { RootState } from './store'

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<IUserDataResponse, void>({
      query: () => ({
        url: 'api/user',
        method: 'GET',
      }),
    }),
    updateUserData: builder.mutation<IUserDataResponse, FormData>({
      query: (formData) => ({
        url: 'api/user',
        method: 'POST',
        body: formData,
      }),
    }),

    updatePassword: builder.mutation<IUpdatePasswordResponse, IUpdatedPassword>(
      {
        query: (newPassword) => ({
          url: 'api/user/password',
          method: 'PATCH',
          body: newPassword,
        }),
      }
    ),
  }),
})

export const {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useUpdatePasswordMutation,
} = userApiSlice
