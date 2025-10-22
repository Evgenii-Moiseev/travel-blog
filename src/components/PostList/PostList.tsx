import type { FC } from 'react'
import type { IPostListProps } from './types'
import { PostCard } from '../PostCard/PostCard'

export const PostList: FC<IPostListProps> = ({ posts }) => {
  return (
    <>
      <ul className="posts__list">
        {posts &&
          posts.map((post) => {
            return (
              <li className="posts__item" key={post.id}>
                <PostCard post={post} />
              </li>
            )
          })}
      </ul>
    </>
  )
}
