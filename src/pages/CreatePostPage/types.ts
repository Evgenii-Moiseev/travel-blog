import z from 'zod'

export const PostSchema = z.object({
  photo: z.string().optional(),
  title: z.string().trim().nonempty('Напишите заголовок'),
  country: z.string().trim().nonempty('Напишите название страны'),
  city: z.string().trim().nonempty('Напишите название города'),
  description: z.string().trim().nonempty('Добавьте описание'),
})

export type Post = z.infer<typeof PostSchema>
