import { useSelector } from 'react-redux'
import { useGetPostsQuery } from '../../app/postsApiSlice'
import { DataError } from '../../components/DataError/DataError'
import { Header } from '../../components/Header/Header'
import { Loader } from '../../components/Loader/Loader'
import { PostList } from '../../components/PostList/PostList'
import { RootState } from '../../app/store'
import { Link } from 'react-router-dom'

const PostsListPage = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Header modifier="header--main" />
      <main>
        <section className="posts">
          <div className="container">
            <h1 className="visually-hidden">
              Там, где мир начинается с&nbsp;путешествий
            </h1>
            <div className="posts__content">
              {posts && <PostList posts={posts} />}
              {isError && <DataError />}
              {isAuthenticated && (
                <Link to={'/create-post'} className="btn btn--primary">
                  Добавить мое путешествие
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default PostsListPage
