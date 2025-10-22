import { Header } from '../../components/Header/Header'
import { Button } from '../../ui/Button/Button'
import { FormField } from '../../ui/FormField/FormField'
import ArrowIcon from '../../assets/svg/arrow-back-icon.svg?react'
import { Link, useNavigate } from 'react-router-dom'
import { FormFieldFile } from '../../ui/FormFieldFile/FormFieldFile'
import { ChangeEvent, useState } from 'react'
import { useCreatePostMutation } from '../../app/postsApiSlice'
import { useForm } from 'react-hook-form'
import { Post, PostSchema } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '../../assets/svg/close-icon.svg?react'

const MAX_DESCR_LENGTH = 2000

const CreatePostPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(PostSchema),
  })

  const descrValue = watch('description') || ''
  const navigate = useNavigate()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setFileName(selectedFile ? selectedFile.name : '')
  }

  const onSubmit = async (data: Post) => {
    const formData = new FormData()
    if (file) {
      formData.append('photo', file)
    }
    formData.append('title', data.title)
    formData.append('country', data.country)
    formData.append('city', data.city)
    formData.append('description', data.description)

    try {
      await createPost(formData)
    } catch (error) {
      console.error('Ошибка при добавлении истории', error)
    }
  }

  const handleCloseBtnClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />
      <main>
        <section className="create-post">
          <div className="container">
            <div className="create-post__content">
              <h1 className="create-post__title">
                Добавление истории о&nbsp;путешествии
              </h1>
              <form
                className="create-post-form"
                id="create-post-form"
                action="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormFieldFile
                  label="Загрузите ваше фото"
                  page="create-post"
                  fileName={fileName}
                >
                  <input
                    className="form-field-file__input"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </FormFieldFile>
                <FormField
                  label="Заголовок"
                  required
                  errorMessage={errors.title?.message}
                >
                  <input
                    className={`form-field__input ${errors.title ? 'form-field__input--error' : ''}`}
                    type="text"
                    placeholder="Заголовок"
                    id="title"
                    {...register('title')}
                  />
                </FormField>
                <fieldset className="create-post-form__place">
                  <FormField
                    label="Страна"
                    required
                    errorMessage={errors.country?.message}
                  >
                    <input
                      className={`form-field__input ${errors.country ? 'form-field__input--error' : ''}`}
                      type="text"
                      placeholder="Страна"
                      id="country"
                      {...register('country')}
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
                </fieldset>

                <FormField
                  label="Описание"
                  required
                  errorMessage={errors.description?.message}
                >
                  <textarea
                    className={`form-field__textarea ${errors.description ? 'form-field__textarea--error' : ''}`}
                    placeholder="Добавьте описание вашей истории "
                    id="descr"
                    maxLength={MAX_DESCR_LENGTH}
                    {...register('description')}
                  />
                  <span className="form-field__textarea-count">
                    {`${MAX_DESCR_LENGTH - descrValue.length}/${MAX_DESCR_LENGTH}`}
                  </span>
                </FormField>

                <div className="create-post-form__btns">
                  <Link to={'/'} className="btn btn--secondary">
                    <ArrowIcon className="btn__icon" width={24} height={24} />
                    <span className="btn__text">Назад</span>
                  </Link>
                  <Button
                    className="btn btn--primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Сохранить
                  </Button>
                </div>
              </form>
              {(isSuccess || isError) && (
                <>
                  <div className="create-post__message">
                    {isSuccess && (
                      <span className="create-post__result">
                        Ваша история успешно добавлена
                      </span>
                    )}

                    {isError && (
                      <span className="create-post__result">
                        Не удалось добавить историю
                      </span>
                    )}

                    <Button
                      className="btn btn--borderless create-post__close-btn"
                      type="button"
                      onClick={handleCloseBtnClick}
                    >
                      <CloseIcon width={21} height={24} />
                    </Button>
                  </div>
                  <div className="overlay"></div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default CreatePostPage
