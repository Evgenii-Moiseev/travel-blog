import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../ui/Button/Button'
import { FormField } from '../../ui/FormField/FormField'
import { Header } from '../../components/Header/Header'
import ArrowIcon from '../../assets/svg/arrow-back-icon.svg?react'
import { useCreateCommentMutation } from '../../app/postsApiSlice'
import { useForm } from 'react-hook-form'
import { Comment, CommentSchema } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '../../assets/svg/close-icon.svg?react'

const MAX_COMMENT_LENGTH = 600

const CreateCommentPage = () => {
  const { id } = useParams<{ id: string }>()

  const [createComment, { isLoading, isSuccess, isError }] =
    useCreateCommentMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Comment>({
    resolver: zodResolver(CommentSchema),
  })

  const commentValue = watch('comment') || ''

  const navigate = useNavigate()

  const handleCloseBtnClick = () => {
    navigate(`/api/posts/${id}`)
  }
  return (
    <>
      <Header />
      <main>
        <section className="create-comment">
          <div className="container">
            <div className="create-comment__content">
              <h1 className="create-comment__title">Добавление отзыва</h1>
              <form
                className="create-comment-form"
                id="create-comment-form"
                action="POST"
                onSubmit={handleSubmit((data) => {
                  if (!id) return
                  createComment({ comment: data, id })
                })}
              >
                <FormField
                  label="Ваше имя"
                  required
                  errorMessage={errors.full_name?.message}
                >
                  <input
                    className={`form-field__input ${errors.full_name ? 'form-field__input--error' : ''}`}
                    type="text"
                    placeholder="Ваше имя"
                    id="full_name"
                    {...register('full_name')}
                  />
                </FormField>

                <FormField
                  label="Описание"
                  required
                  errorMessage={errors.comment?.message}
                >
                  <textarea
                    className={`form-field__textarea ${errors.comment ? 'form-field__textarea--error' : ''}`}
                    placeholder="Добавьте текст отзыва"
                    id="comment"
                    maxLength={MAX_COMMENT_LENGTH}
                    {...register('comment')}
                  />
                  <span className="form-field__textarea-count">
                    {`${MAX_COMMENT_LENGTH - commentValue.length}/${MAX_COMMENT_LENGTH}`}
                  </span>
                </FormField>

                <div className="create-comment-form__btns">
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
                        Ваш отзыв успешно добавлен
                      </span>
                    )}

                    {isError && (
                      <span className="create-post__result">
                        Не удалось добавить отзыв
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

export default CreateCommentPage
