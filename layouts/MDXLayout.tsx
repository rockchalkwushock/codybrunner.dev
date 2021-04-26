import * as React from 'react'
import NextImage from 'next/image'
import { getMDXComponent } from 'mdx-bundler/client'

import { PostLink } from '@components/PostLink'
import { Post } from '@interfaces/blog'
// import {} from '@hooks/'
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
        <span className="flex flex-col font-bold items-center justify-center mb-16 py-4 rounded-lg text-red-500 text-4xl">
          DRAFT
        </span>
      )}
      <header className="flex flex-col mb-12 space-y-8 w-full md:mb-8">
        <h1 className="text-4xl text-center md:text-left">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <div className="h-8 mr-2 relative w-8 md:hidden">
              <NextImage
                alt="Cody Brunner"
                className="rounded-full"
                height="32"
                src="/images/me.jpg"
                width="32"
              />
            </div>

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
      {frontMatter.versions && (
        <section className="border flex flex-col mb-8 p-4 rounded-lg shadow-md space-y-2">
          <h2 className="font-light italic text-lg tracking-wide underline">
            Versions at time of writing:
          </h2>
          <ul>
            {Object.keys(frontMatter.versions).map(tech => (
              <li key={tech}>
                <code>
                  {tech}: {frontMatter.versions![tech]}
                </code>
              </li>
            ))}
          </ul>
        </section>
      )}
      <article className="max-w-none mb-8">
        <MDXContent />
      </article>
      <section
        className={`flex mb-8 ${
          previousPost && nextPost
            ? 'justify-between'
            : previousPost
            ? 'justify-start'
            : 'justify-end'
        }`}
      >
        {previousPost && (
          <PostLink
            className="bg-secondary border border-transparent outline-none px-8 py-2 rounded-lg shadow-md text-secondary text-xl focus:outline-none"
            slug={previousPost}
          >
            Previous
          </PostLink>
        )}
        {nextPost && (
          <PostLink
            className="bg-secondary border border-transparent outline-none px-8 py-2 rounded-lg shadow-md text-secondary text-xl focus:outline-none"
            slug={nextPost}
          >
            Next
          </PostLink>
        )}
      </section>
    </>
  )
}
