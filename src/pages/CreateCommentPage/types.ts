import z from 'zod'

export const CommentSchema = z.object({
  full_name: z.string().trim().nonempty('Напишите имя'),
  comment: z.string().trim().nonempty('Добавьте текст отзыва '),
})

export type Comment = z.infer<typeof CommentSchema>
