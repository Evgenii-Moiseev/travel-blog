import { ChangeEvent, useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import {
  useGetUserDataQuery,
  useUpdatePasswordMutation,
  useUpdateUserDataMutation,
} from '../../app/userApiSlice'
import { DataError } from '../../components/DataError/DataError'
import { BASE_URL } from '../../app/config'
import { Button } from '../../ui/Button/Button'
import EditIcon from '../../assets/svg/edit-icon.svg?react'
import { Loader } from '../../components/Loader/Loader'
import { FormField } from '../../ui/FormField/FormField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdatedUserData, UpdatedUserDataSchema } from './types'
import { FormFieldFile } from '../../ui/FormFieldFile/FormFieldFile'

const MAX_BIO_LENGTH = 600

const UserProfilePage = () => {
  const [profileState, setProfileState] = useState('profile')

  const {
    data: user,
    isLoading: isUserDataLoading,
    refetch,
  } = useGetUserDataQuery()

  const [
    updateUserData,
    { isLoading: isUpdateUserDataLoading, isSuccess: isUpdateUserDataSuccess },
  ] = useUpdateUserDataMutation()

  const [
    updatePassword,
    { isLoading: isUpdatePasswordLoading, isSuccess: isUpdatePasswordSuccess },
  ] = useUpdatePasswordMutation()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdatedUserData>({
    resolver: zodResolver(UpdatedUserDataSchema),
    defaultValues: {
      full_name: '',
      city: '',
      bio: '',
    },
  })

  const bioValue = watch('bio') || ''

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || '',
        city: user.city || '',
        bio: user.bio || '',
      })
    }
  }, [user, reset])

  useEffect(() => {
    if (isUpdateUserDataSuccess && isUpdatePasswordSuccess) {
      handleSwitchToProfile()
      refetch()
    }
  }, [isUpdateUserDataSuccess, isUpdatePasswordSuccess, refetch])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null

    if (selectedFile) {
      const formData = new FormData()
      formData.append('photo', selectedFile)

      if (user) {
        formData.append('full_name', user.full_name)
      }

      try {
        await updateUserData(formData)
        refetch()
      } catch (error) {
        console.error('Ошибка при обновлении фото', error)
      }
    }
  }

  const handleSwitchToEdit = () => {
    setProfileState('edit')
  }

  const handleSwitchToProfile = () => {
    setProfileState('profile')
  }

  const onSubmit = async (data: UpdatedUserData) => {
    const formData = new FormData()
    formData.append('full_name', data.full_name)
    formData.append('city', data.city)
    if (data.bio) {
      formData.append('bio', data.bio)
    }
    if (data.password && data.confirm) {
      await updatePassword({ password: data.password })
    }
    try {
      await updateUserData(formData)
      refetch()
    } catch (error) {
      console.error('Ошибка при обновлении данных', error)
    }
  }

  if (isUserDataLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <main>
        <section className="profile">
          <div className="container">
            <h1 className="visually-hidden">Страница профиля пользователя</h1>
            <div className="profile__content">
              {!user && <DataError />}
              {user && (
                <div className="profile__wrap">
                  <div className="profile__photo">
                    {isUpdateUserDataLoading && !isUpdatePasswordLoading ? (
                      <Loader modifier="loader--absolute" />
                    ) : (
                      <>
                        <img
                          src={
                            user.photo
                              ? `${BASE_URL}${user.photo}`
                              : '/profile.jpg'
                          }
                          alt={user.full_name}
                          className="profile__img"
                          width={240}
                          height={240}
                        />
                        <FormFieldFile label="Изменить фото" page="profile">
                          <input
                            className="form-field-file__input"
                            type="file"
                            accept="image/png, image/jpeg"
                            id="photo"
                            onChange={handleFileChange}
                          />
                        </FormFieldFile>
                      </>
                    )}
                  </div>

                  {profileState === 'profile' && (
                    <div className="profile__data">
                      <span className="profile__name">
                        {user.full_name ? user.full_name : 'Имя не указано'}
                      </span>
                      <span className="profile__heading">Город:</span>
                      <span className="profile__city">
                        {user.city ? user.city : 'Город не указан'}
                      </span>
                      <span className="profile__heading">О себе:</span>
                      <span className="profile__about">
                        {user.bio ? user.bio : 'Информация не указана'}
                      </span>
                      <Button
                        className="btn btn--borderless profile__edit-btn"
                        type="button"
                        onClick={handleSwitchToEdit}
                      >
                        <EditIcon
                          className="btn__icon"
                          width={32}
                          height={32}
                        />
                      </Button>
                    </div>
                  )}
                  {profileState === 'edit' && (
                    <div className="profile__edit">
                      <form
                        className="edit-form"
                        id="edit-form"
                        action="POST"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <FormField
                          label="ФИО"
                          required
                          errorMessage={errors.full_name?.message}
                        >
                          <input
                            className={`form-field__input ${errors.full_name ? 'form-field__input--error' : ''}`}
                            type="text"
                            placeholder="ФИО"
                            id="full_name"
                            {...register('full_name')}
                          />
                        </FormField>
                        <FormField
                          label="Город"
                          required
                          errorMessage={errors.city?.message}
                        >
                          <input
                            className={`form-field__input ${errors.city ? 'form-field__input--error' : ''}`}
                            type="text"
                            placeholder="Город"
                            id="city"
                            {...register('city')}
                          />
                        </FormField>

                        <FormField label="О себе">
                          <textarea
                            className={`form-field__textarea`}
                            placeholder="О себе"
                            id="bio"
                            maxLength={MAX_BIO_LENGTH}
                            {...register('bio')}
                          />
                          <span className="form-field__textarea-count">
                            {`${MAX_BIO_LENGTH - bioValue.length}/${MAX_BIO_LENGTH}`}
                          </span>
                        </FormField>
                        <div className="edit-form__wrap">
                          <span className="edit-form__subtitle">
                            Смена пароля
                          </span>
                          <fieldset className="edit-form__passwords">
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
                        </div>

                        <div className="edit-form__btns">
                          <Button
                            className="btn btn--secondary"
                            type="button"
                            onClick={handleSwitchToProfile}
                          >
                            Назад
                          </Button>
                          <Button
                            className="btn btn--primary"
                            type="submit"
                            isLoading={
                              isUpdateUserDataLoading || isUpdatePasswordLoading
                            }
                          >
                            Сохранить
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default UserProfilePage
