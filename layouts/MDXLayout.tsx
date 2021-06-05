import * as React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { Avatar } from '@components/Avatar'
import { CodeBlock } from '@components/CodeBlock'
import { PaginationButton } from '@components/PaginationButton'
import { PostLink } from '@components/PostLink'
import { PostShare } from '@components/PostShare'
import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {
  relatedPosts?: Array<Post>
}

export const MDXLayout: React.FC<Props> = ({
  frontMatter,
  nextPost,
  previousPost,
  relatedPosts,
  source,
}) => {
  const MDXContent = React.useMemo(() => getMDXComponent(source), [source])
  return (
    <>
      {!frontMatter.published && <span className="draft-banner">DRAFT</span>}
      <header className="flex flex-col space-y-8 w-full">
        <h1 className="text-accent text-5xl text-center md:text-left">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 mr-2 w-9 lg:hidden" />

            <div className="flex flex-col">
              <p className="text-secondary">
                {`${constants.author} / ${formatDateTime(
                  frontMatter.createdAt,
                  'full-date-localized'
                )}`}
              </p>
              {frontMatter.updatedAt && (
                <span className="text-secondary">
                  Updated:{' '}
                  {formatDateTime(frontMatter.updatedAt, 'full-date-localized')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-secondary lg:pr-4">{frontMatter.readingTime}</p>
          </div>
        </div>
      </header>
      <hr className="divider" />
      <article className="max-w-none prose prose-lg md:prose-xl tracking-wide md:tracking-normal">
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
      <PostShare frontMatter={frontMatter} />
      <hr className="divider" />
      {!!relatedPosts && !!relatedPosts.length && (
        <>
          <section>
            <h1 className="mb-4 text-accent text-4xl">Related Posts</h1>
            <ul className="flex flex-col items-center justify-center space-y-4 lg:items-start">
              {relatedPosts.map(({ frontMatter }) => (
                <PostLink key={frontMatter.slug} slug={frontMatter.slug}>
                  <h2 className="text-lg underline">{frontMatter.title}</h2>
                </PostLink>
              ))}
            </ul>
          </section>
          <hr className="divider" />
        </>
      )}

      <section
        className={`flex ${
          previousPost && nextPost
            ? 'justify-between'
            : previousPost
            ? 'justify-start'
            : 'justify-end'
        }`}
      >
        {previousPost && (
          <PaginationButton direction="prev" slug={previousPost} />
        )}
        {nextPost && <PaginationButton direction="next" slug={nextPost} />}
      </section>
    </>
  )
}
