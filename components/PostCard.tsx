import * as React from 'react'

import { PostLink } from '@components/PostLink'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {}

export const PostCard: React.FC<Props> = ({
  excerpt,
  publishedAt,
  readingTime,
  slug,
  tags,
  title,
}) => {
  return (
    <PostLink
      className="bg-gray-medium flex flex-col group p-4 rounded-lg shadow-xl space-y-4 transform-gpu w-full md:bg-gray-dark md:w-8/12 lg:w-10/12 hover:scale-95"
      slug={slug}
    >
      <div className="flex flex-col space-y-1">
        <h2 className="font-bold text-2xl text-brand group-hover:text-accent-magenta">
          {title}
        </h2>
        <div className="flex justify-between">
          <span className="font-medium text-secondary">
            {formatDateTime(publishedAt, 'full-date-localized')}
          </span>
          <span className="font-medium text-secondary">{readingTime}</span>
        </div>
      </div>
      <hr className="divider -mx-4" />
      <div className="flex flex-col space-y-4">
        <span className="font-medium text-secondary">{excerpt}</span>
        <ul className="flex space-x-2">
          {tags.map(({ name }) => (
            <Tag key={name} tag={name} />
          ))}
        </ul>
      </div>
    </PostLink>
  )
}
