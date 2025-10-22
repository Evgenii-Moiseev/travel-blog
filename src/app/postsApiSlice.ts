import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  CommentRequestBody,
  type CommentFullResponse,
  type PostDetail,
  type PostsList,
} from './types'
import { BASE_URL } from './config'
import { RootState } from './store'

export const postsApiSlice = createApi({
  reducerPath: 'postsApi',
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
  tagTypes: ['posts', 'post'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsList, void>({
      query: () => ({
        url: '/api/posts',
        method: 'GET',
      }),
      providesTags: ['posts'],
    }),
    getPostById: builder.query<PostDetail, number>({
      query: (id) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'post', id }],
    }),
    createPost: builder.mutation<PostDetail, FormData>({
      query: (formData) => ({
        url: '/api/posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['posts'],
    }),
    createComment: builder.mutation<
      CommentFullResponse,
      { comment: CommentRequestBody; id: string }
    >({
      query: ({ comment, id }) => ({
        url: `/api/posts/${id}/comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'post', id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useCreateCommentMutation,
} = postsApiSlice
