import * as React from 'react'

import { PostLink } from './PostLink'
import { Tag } from './Tag'
import { Post } from '@interfaces/blog'
import { formatDateTime, Formats } from '@utils/dateTime'

interface Props extends Pick<Post, 'frontMatter'> {
  dateFormat: Formats
}

export const PostListItem: React.FC<Props> = ({ dateFormat, frontMatter }) => {
  return (
    <PostLink slug={frontMatter.slug}>
      <li
        className={`px-4 py-2 rounded-lg shadow-md space-y-2 ${
          frontMatter.published
            ? 'bg-secondary border border-transparent'
            : 'bg-red-50 border-2 border-red-500'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex space-x-2">
            <h2 className="text-lg underline">{frontMatter.title}</h2>
            <ul className="hidden xl:flex xl:space-x-2">
              {frontMatter.tags.map(tag => (
                <Tag key={tag.toLowerCase()} tag={tag.toLowerCase()} />
              ))}
            </ul>
          </div>
          <p>
            {formatDateTime(
              frontMatter.updatedAt || frontMatter.createdAt,
              dateFormat
            )}
          </p>
        </div>
        <p className="text-sm">{frontMatter.description}</p>
        <ul className="flex space-x-2 xl:hidden">
          {frontMatter.tags.map(tag => (
            <Tag key={tag.toLowerCase()} tag={tag.toLowerCase()} />
          ))}
        </ul>
      </li>
    </PostLink>
  )
}
