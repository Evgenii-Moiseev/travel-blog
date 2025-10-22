import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../ui/Button/Button'
import { FormField } from '../../ui/FormField/FormField'
import { Header } from '../../components/Header/Header'
import { LoginFormData, LoginFormDataSchema } from './types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '../../app/authApiSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../app/authSlice'
import { getErrorMessage } from '../../utils/getErrorMessage'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormDataSchema),
  })

  const [login, { data, isSuccess, isLoading, isError, error }] =
    useLoginMutation()

  const dispatch = useDispatch()

  let errorLoginMessage = ''

  if (isError) {
    errorLoginMessage = getErrorMessage(error).errorMessage
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data))
      navigate('/profile')
    }
  }, [isSuccess, data, dispatch, navigate])

  return (
    <>
      <Header />
      <main>
        <section className="login">
          <div className="container">
            <div className="login__content">
              <h1 className="login__title">Вход в профиль</h1>
              {isError && (
                <span className="login__error">{errorLoginMessage}</span>
              )}
              <form
                className="login-form"
                id="login-form"
                action="POST"
                onSubmit={handleSubmit(({ email, password }) => {
                  login({ email, password })
                })}
              >
                <FormField
                  label="Логин"
                  required
                  errorMessage={errors.email?.message}
                >
                  <input
                    className={`form-field__input ${errors.email ? 'form-field__input--error' : ''}`}
                    type="text"
                    placeholder="Email"
                    id="email"
                    {...register('email')}
                  />
                </FormField>

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

                <div className="login-form__btns">
                  <Link to={'/register'} className="btn btn--primary">
                    Зарегистрироваться
                  </Link>
                  <Button
                    className="btn btn--secondary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Войти
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default LoginPage
