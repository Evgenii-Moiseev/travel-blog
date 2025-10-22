import { Header } from '../../components/Header/Header'
import { FormField } from '../../ui/FormField/FormField'
import { Button } from '../../ui/Button/Button'
import { useForm } from 'react-hook-form'
import { RegisterFormData, RegisterFormDataSchema } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterUserMutation } from '../../app/authApiSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '../../utils/getErrorMessage'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormDataSchema),
  })

  const [registerUser, { isSuccess, isLoading, isError, error }] =
    useRegisterUserMutation()

  const navigate = useNavigate()

  let errorRegisterMessage = ''
  let errorStatus = null

  if (isError) {
    errorRegisterMessage = getErrorMessage(error).errorMessage
    errorStatus = getErrorMessage(error).errorStatus
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess, navigate])

  return (
    <>
      <Header />
      <main>
        <section className="register">
          <div className="container">
            <div className="register__content">
              <h1 className="register__title">Регистрация</h1>
              {isError && errorStatus !== 400 && (
                <span className="register__error">{errorRegisterMessage}</span>
              )}
              <form
                className="register-form"
                id="register-form"
                action="POST"
                onSubmit={handleSubmit(({ email, password }) => {
                  registerUser({ email, password })
                })}
              >
                <FormField
                  label="Email"
                  required
                  errorMessage={
                    error && errorStatus === 400
                      ? errorRegisterMessage
                      : errors.email?.message
                  }
                >
                  <input
                    className={`form-field__input ${errors.email ? 'form-field__input--error' : ''}`}
                    type="text"
                    placeholder="Email"
                    id="email"
                    {...register('email')}
                  />
                </FormField>

                <fieldset className="register-form__passwords">
                  <FormField
                    label="Пароль"
                    required
                    errorMessage={errors.password?.message}
                  >
                    <input
                      className={`form-field__input ${errors.password ? 'form-field__input--error' : ''}`}
                      type="password"
                      placeholder="Пароль"
                      id="password"
                      {...register('password')}
                    />
                  </FormField>
                  <FormField
                    label="Повторите пароль"
                    required
                    errorMessage={errors.confirm?.message}
                  >
                    <input
                      className={`form-field__input ${errors.confirm ? 'form-field__input--error' : ''}`}
                      type="password"
                      placeholder="Повторите пароль"
                      id="confirm"
                      {...register('confirm')}
                    />
                  </FormField>
                </fieldset>

                <Button
                  className="btn btn--primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Зарегистрироваться
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default RegisterPage
