import * as React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { Avatar } from '@components/Avatar'
import { CodeBlock } from '@components/CodeBlock'
import { PaginationButton } from '@components/PaginationButton'
import { PostLink } from '@components/PostLink'
import { PostShare } from '@components/PostShare'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {
  relatedPosts?: Array<Post>
}

export const MDXLayout: React.FC<Props> = ({ source, ...post }) => {
  const MDXContent = React.useMemo(() => getMDXComponent(source), [source])
  return (
    <>
      <header className="flex flex-col space-y-4 w-full">
        <h1 className="font-custom-header leading-tight text-brand text-5xl text-center md:text-left">
          {post.title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 mr-2 w-9 lg:hidden" />

            <div className="flex flex-col">
              <p>
                {`${post.author} / ${formatDateTime(
                  post.publishedAt || post.createdAt,
                  'full-date-localized'
                )}`}
              </p>
              {post.updatedAt && (
                <span>
                  Updated:{' '}
                  {formatDateTime(post.updatedAt, 'full-date-localized')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="lg:pr-4">{post.readingTime}</p>
          </div>
        </div>
        {post.slug !== 'about' && post.tags && (
          <div className="flex flex-col items-center md:flex-row md:space-x-2">
            <ul className="flex space-x-2">
              {post.tags.map(tag => (
                <Tag key={tag} tag={tag}>
                  {tag}
                </Tag>
              ))}
            </ul>
          </div>
        )}
      </header>
      <hr className="divider" />
      <article className="max-w-none prose prose-xl tracking-wide">
        <MDXContent
          components={{
            // @ts-ignore
            pre: ({ children: { props } }) => {
              return (
                <CodeBlock
                  code={props.children.trim()}
                  language={
                    props.className && props.className.replace('language-', '')
                  }
                />
              )
            },
          }}
        />
      </article>
      <hr className="divider" />
      <PostShare {...post} />
      <hr className="divider" />
      <section
        className={`flex mb-8 ${
          post.previousPost && post.nextPost
            ? 'justify-between'
            : post.previousPost
            ? 'justify-start'
            : 'justify-end'
        }`}
      >
        {post.previousPost && (
          <PaginationButton direction="prev" slug={post.previousPost} />
        )}
        {post.nextPost && (
          <PaginationButton direction="next" slug={post.nextPost} />
        )}
      </section>
      {!!post.relatedPosts && !!post.relatedPosts.length && (
        <>
          <section>
            <h1 className="text-center mb-4 text-4xl md:text-left">
              Related Posts
            </h1>
            <ul className="flex flex-col items-center justify-center space-y-4 md:items-start">
              {post.relatedPosts.map(
                ({ createdAt, publishedAt, slug, title, updatedAt }) => (
                  <PostLink
                    className="bg-gray-medium flex group items-center justify-between p-4 rounded-lg shadow-xl w-full md:bg-gray-dark hover:bg-accent-magenta"
                    key={slug}
                    slug={slug}
                  >
                    <h2 className="font-medium text-brand text-xl underline group-hover:text-white">
                      {title}
                    </h2>
                    <span className="text-lg group-hover:text-white">
                      {formatDateTime(
                        updatedAt || publishedAt || createdAt,
                        'full-date-localized'
                      )}
                    </span>
                  </PostLink>
                )
              )}
            </ul>
          </section>
        </>
      )}
    </>
  )
}
