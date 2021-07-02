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
        className={`border border-transparent px-4 py-2 rounded-lg shadow-md space-y-2 ${
          frontMatter.published
            ? 'bg-brand text-black'
            : 'bg-accent-red text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-2">
            <h2 className="font-medium text-lg underline">
              {frontMatter.title}
            </h2>
            {/* <ul className="hidden xl:flex xl:space-x-2">
              {frontMatter.tags.map(tag => (
                <Tag key={tag.toLowerCase()} tag={tag.toLowerCase()} />
              ))}
            </ul> */}
          </div>
          <p className="font-medium">
            {formatDateTime(
              frontMatter.updatedAt || frontMatter.createdAt,
              dateFormat
            )}
          </p>
        </div>
        <p className="font-medium italic">{frontMatter.description}</p>
        <ul className="flex space-x-2">
          {frontMatter.tags.map(tag => (
            <Tag key={tag.toLowerCase()} tag={tag.toLowerCase()} />
          ))}
        </ul>
      </li>
    </PostLink>
  )
}
