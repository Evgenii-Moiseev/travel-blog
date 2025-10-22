import z from 'zod'

export const UpdatedUserDataSchema = z
  .object({
    full_name: z.string().trim().nonempty('Обязательное поле'),
    city: z.string().trim().nonempty('Обязательное поле'),
    bio: z.string().optional(),
    password: z
      .string()
      .min(6, 'Введите пароль не менее 6 символов')
      .optional(),
    confirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirm) {
        if (!data.password || !data.confirm) {
          return false
        }
        return data.password === data.confirm
      }
      return true
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirm'],
    }
  )

export type UpdatedUserData = z.infer<typeof UpdatedUserDataSchema>
