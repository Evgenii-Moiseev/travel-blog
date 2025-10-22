import z from 'zod'

export const PostCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  county: z.string(),
  city: z.string(),
  photo: z.string(),
})

export type PostCard = z.infer<typeof PostCardSchema>
export const PostsListSchema = z.array(PostCardSchema)
export type PostsList = z.infer<typeof PostsListSchema>

export const CommentResponseSchema = z.object({
  author_name: z.string(),
  comment: z.string(),
  created_at: z.string(),
})

export const CommentsResponseSchema = z.array(CommentResponseSchema)
export type CommentResponse = z.infer<typeof CommentResponseSchema>
export type CommentsResponse = z.infer<typeof CommentsResponseSchema>

export const CommentFullSchema = CommentResponseSchema.extend({
  id: z.number(),
  post_id: z.number(),
})

export const CommentsFullSchema = z.array(CommentFullSchema)
export type CommentFullResponse = z.infer<typeof CommentFullSchema>
export type CommentsFullResponse = z.infer<typeof CommentsFullSchema>

export const CommentRequestBodySchema=z.object({
  full_name: z.string(),
  comment: z.string(),
})

export type CommentRequestBody=z.infer<typeof CommentRequestBodySchema>

const UserInfoSchema = z.object({
  full_name: z.string(),
  city: z.string(),
  bio: z.string(),
})

export const PostDetailSchema = PostCardSchema.omit({ excerpt: true }).extend({
  description: z.string(),
  comments: CommentsResponseSchema,
  userInfo: UserInfoSchema,
})

export type PostDetail = z.infer<typeof PostDetailSchema>

export interface IAuthResponse {
  token: string
}

export type TUserRegisterData = {
  email: string
  password: string
}

export interface ILogoutResponse {
  message: string
}

export interface IUserDataResponse {
  id: number
  full_name: string
  city: string
  country: string
  bio: string
  photo: string
}

export interface IUserUpdatedData {
  full_name?: string
  city?: string
  country?: string
  bio?: string
  photo?: string
}

export interface IUpdatedPassword {
  password: string|undefined
}

export interface IUpdatePasswordResponse {
  message: string
}

export interface IAuthState {
  isAuthenticated: boolean
  token: string | null
}

