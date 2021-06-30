import * as React from 'react'

import { PostLink } from './PostLink'
import { Post } from '@interfaces/blog'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Pick<Post, 'frontMatter'> {}

export const ArchivedPost: React.FC<Props> = ({ frontMatter }) => {
  return (
    <PostLink slug={frontMatter.slug}>
      <li className="bg-accent-purple border border-transparent flex p-4 rounded-lg shadow-md text-gray-dark md:justify-between lg:p-0 lg:bg-transparent lg:shadow-none lg:text-white">
        <div className="flex flex-col md:flex-col">
          <h2 className="font-medium text-lg underline">{frontMatter.title}</h2>
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
