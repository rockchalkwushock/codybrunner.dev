import * as React from 'react'

import { PostLink } from './PostLink'
import { Tag } from './Tag'
import { Post } from '@interfaces/blog'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Pick<Post, 'frontMatter'> {}

export const ArchivedPost: React.FC<Props> = ({ frontMatter }) => {
  return (
    <PostLink slug={frontMatter.slug}>
      <li className="bg-accent border border-transparent flex p-4 rounded-lg shadow-md text-coolGray-50 dark:text-coolGray-900 md:justify-between">
        <div className="flex md:flex-col md:space-y-2">
          <h2 className="text-lg underline">{frontMatter.title}</h2>
          <span>{frontMatter.description}</span>
          <ul className="hidden md:flex md:items-center md:space-x-4">
            {frontMatter.tags.map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>
        </div>
        <p className="hidden md:flex">
          {formatDateTime(
            frontMatter.updatedAt || frontMatter.createdAt,
            'day-month'
          )}
        </p>
      </li>
    </PostLink>
  )
}
