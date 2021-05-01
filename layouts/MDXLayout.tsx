import * as React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { Avatar } from '@components/Avatar'
import { CodeBlock } from '@components/CodeBlock'
import { PaginationButton } from '@components/PaginationButton'
import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {}

export const MDXLayout: React.FC<Props> = ({
  frontMatter,
  nextPost,
  previousPost,
  source,
}) => {
  const MDXContent = React.useMemo(() => getMDXComponent(source), [source])
  return (
    <>
      {!frontMatter.published && (
        <span className="bg-red-200 border-2 border-red-500 flex flex-col font-bold items-center justify-center mb-16 py-4 rounded-lg text-red-500 text-4xl">
          DRAFT
        </span>
      )}
      <header className="flex flex-col space-y-8 w-full">
        <h1 className="text-4xl text-center md:text-left">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 mr-2 w-9 md:hidden" />

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
      <hr className="border-blueGray-400 my-8" />
      <article className="prose prose-blue">
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
      <hr className="border-blueGray-400 my-8" />
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
