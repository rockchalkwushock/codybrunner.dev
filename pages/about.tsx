import * as React from 'react'
import { GetStaticProps } from 'next'
import { isEqual } from 'date-fns'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Avatar } from '@components/Avatar'
import { Post } from '@interfaces/blog'
import { getPage } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Omit<Post, 'tags'> {}

const technologies = [
  'apollographql',
  'bootstrap',
  'chakra-ui',
  'css3',
  'django',
  'elixir',
  'fly.io',
  'gatsbyjs',
  'ghost-cms',
  'graphql',
  'heroku',
  'html5',
  'javascript',
  'mongodb',
  'netlify',
  'nextjs',
  'nodejs',
  'phoenix',
  'postgresql',
  'python',
  'reactjs',
  'react-query',
  'redux',
  'styled-components',
  'tailwindcss',
  'typescript',
  'vercel',
  'x-state',
]

const customTags = [
  'Colombia',
  'expatriate',
  'front end engineer',
  'full stack engineer',
  'software engineer',
  'United State of America',
  'web developer',
  ...technologies,
]

const About: React.FC<Props> = ({
  author,
  excerpt,
  image,
  publishedAt,
  readingTime,
  source,
  title,
  updatedAt,
  words,
}) => {
  const pageMetaData: PageMetaData = {
    author: author.name,
    description: excerpt,
    image: image!,
    publishedAt,
    tags: customTags,
    title: `codybrunner.dev | ${title}`,
    type: 'article',
    updatedAt,
    wordCount: words,
  }

  return (
    <AnimatedPage pageMetaData={pageMetaData}>
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
      </header>
      <hr className="divider" />
      <article
        className="max-w-none prose prose-xl tracking-wide"
        dangerouslySetInnerHTML={{ __html: source }}
      />
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const page = await getPage('about')
    return { props: { ...page } }
  } catch (error) {
    throw new Error(error)
  }
}

export default About
