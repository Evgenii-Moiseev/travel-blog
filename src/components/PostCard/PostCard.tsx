import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IPostCardProps } from './types'
import { BASE_URL } from '../../app/config'

export const PostCard: FC<IPostCardProps> = ({ post }) => {
  return (
    <>
      <div className="post-card">
        <img
          className="post-card__img"
          src={`${BASE_URL}${post.photo}`}
          alt={post.title}
          width={370}
          height={288}
        />
        <div className="post-card__info">
          <h2 className="post-card__title">{post.title}</h2>
          <p className="post-card__descr">{post.excerpt}</p>
          <div className="post-card__wrap">
            <span className="post-card__place">
              {post.county}, {post.city}
            </span>
            <Link className="post-card__link" to={`/api/posts/${post.id}`}>
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
