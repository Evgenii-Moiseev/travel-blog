import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './config'
import { IAuthResponse, ILogoutResponse, TUserRegisterData } from './types'
import { RootState } from './store'
import { userApiSlice } from './userApiSlice'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
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
    registerUser: builder.mutation<IAuthResponse, TUserRegisterData>({
      query: (userData) => ({
        url: 'api/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<IAuthResponse, TUserRegisterData>({
      query: (userData) => ({
        url: 'api/login',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: 'api/logout',
        method: 'GET',
      }),
      onQueryStarted:async(_,{dispatch, queryFulfilled})=>{
        await queryFulfilled
        dispatch(userApiSlice.util.resetApiState())
      },
    }),
  }),
})

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice
