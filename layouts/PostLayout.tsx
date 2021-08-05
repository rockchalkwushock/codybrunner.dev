import * as React from 'react'
import { isEqual } from 'date-fns'

import { Avatar } from '@components/Avatar'
import { PostLink } from '@components/PostLink'
import { PostShare } from '@components/PostShare'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'

import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {
  relatedPosts?: Array<Post>
}

export const PostLayout: React.FC<Props> = ({
  author,
  excerpt,
  publishedAt,
  readingTime,
  relatedPosts,
  source,
  tags,
  title,
  updatedAt,
}) => {
  return (
    <>
      <header className="flex flex-col space-y-4 w-full">
        <h1 className="font-custom-header leading-tight text-brand text-5xl text-center md:text-left">
          {title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 mr-2 w-9 lg:hidden" />

            <div className="flex flex-col">
              <p>{`${author.name} / ${formatDateTime(
                publishedAt,
                'full-date-localized'
              )}`}</p>
              {/* Check if the dates are the same and if they are don't render.
              Do this because Ghost CMS populates updated_at at create time. */}
              {isEqual(new Date(publishedAt), new Date(updatedAt)) && (
                <span>
                  Updated: {formatDateTime(updatedAt, 'full-date-localized')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="lg:pr-4">{readingTime}</p>
          </div>
        </div>

        {!!tags && (
          <div className="flex flex-col items-center md:flex-row md:space-x-2">
            <ul className="flex space-x-2">
              {tags.map(tag => (
                <Tag key={tag.slug} {...tag}>
                  {tag.name}
                </Tag>
              ))}
            </ul>
          </div>
        )}
      </header>
      <hr className="divider" />
      <article
        className="max-w-none prose prose-xl tracking-wide"
        dangerouslySetInnerHTML={{ __html: source }}
      />
      <hr className="divider" />
      <PostShare excerpt={excerpt} tags={tags} title={title} />
      <hr className="divider" />
      {!!relatedPosts && !!relatedPosts.length && (
        <>
          <section>
            <h1 className="text-center mb-4 text-4xl md:text-left">
              Related Posts
            </h1>
            <ul className="flex flex-col items-center justify-center space-y-4 md:items-start">
              {relatedPosts.map(({ publishedAt, slug, title }) => (
                <PostLink
                  className="bg-gray-medium flex group items-center justify-between p-4 rounded-lg shadow-xl w-full md:bg-gray-dark hover:bg-accent-magenta"
                  key={slug}
                  slug={slug}
                >
                  <h2 className="font-medium text-brand text-xl underline group-hover:text-white">
                    {title}
                  </h2>
                  <span className="text-lg group-hover:text-white">
                    {formatDateTime(publishedAt, 'full-date-localized')}
                  </span>
                </PostLink>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  )
}
