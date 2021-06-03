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
        <div className="flex flex-col md:flex-col">
          <h2 className="text-lg underline">{frontMatter.title}</h2>
          <span className="italic text-accent-secondary">
            {frontMatter.description}
          </span>
          <ul className="hidden md:flex md:items-center md:mt-2 md:space-x-4">
            {frontMatter.tags.map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>
        </div>
        <p className="hidden md:flex md:flex-grow md:flex-shrink-0 md:justify-end">
          {formatDateTime(
            frontMatter.updatedAt || frontMatter.createdAt,
            'day-month'
          )}
        </p>
      </li>
    </PostLink>
  )
}
