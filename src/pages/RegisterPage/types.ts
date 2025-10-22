import z from 'zod'

export const RegisterFormDataSchema = z
  .object({
    email: z.email('Некорректный email').trim(),
    password: z.string().trim().nonempty('Обязательное поле').min(6,'Введите пароль не менее 6 символов'),
    confirm: z.string().trim().nonempty('Обязательное поле').min(6,'Введите пароль не менее 6 символов'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  })

export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>
