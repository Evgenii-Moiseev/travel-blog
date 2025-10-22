import z from 'zod'

export const LoginFormDataSchema = z.object({
  email: z.email('Некорректный email').trim(),
  password: z
    .string()
    .trim()
    .nonempty('Обязательное поле')
    .min(6, 'Введите пароль не менее 6 символов'),
})

export type LoginFormData = z.infer<typeof LoginFormDataSchema>
