import { Link, useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/postsApiSlice'
import { DataError } from '../../components/DataError/DataError'
import { Loader } from '../../components/Loader/Loader'
import { Header } from '../../components/Header/Header'
import { BASE_URL } from '../../app/config'
import { getDate } from '../../utils/getDate'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import ArrowIcon from '../../assets/svg/arrow-back-icon.svg?react'

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading, isError } = useGetPostByIdQuery(Number(id))

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <main>
        <section className="post">
          <div className="container">
            {(!post || isError) && <DataError />}
            {post && (
              <div className="post__content">
                <img
                  className="post__img"
                  src={`${BASE_URL}${post.photo}`}
                  alt={post.title}
                />
                <div className="post__wrap">
                  <h1 className="post__title">{post.title}</h1>
                  <p className="post__descr">{post.description}</p>
                  {post.comments.length > 0 && (
                    <ul className="post__comment-list">
                      {post.comments.map((comment, index) => {
                        return (
                          <li className="post__comment-item" key={index}>
                            <div className="post__comment">
                              <span className="post__coment-author">
                                {comment.author_name}
                              </span>
                              <span className="post__comment-date">
                                {getDate(comment.created_at)}
                              </span>
                              <p className="post__comment-text">
                                {comment.comment}
                              </p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <div className="post__nav">
                    <Link to={'/'} className="btn btn--secondary">
                      <ArrowIcon className="btn__icon" width={24} height={24} />
                      <span className="btn__text">Назад</span>
                    </Link>
                    {isAuthenticated && (
                      <Link to={'create-comment'} className="btn btn--primary">
                        Ваше впечатление об этом месте
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default PostDetailPage
