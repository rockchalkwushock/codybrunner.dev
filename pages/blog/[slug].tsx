import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { isEqual } from 'date-fns'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Avatar } from '@components/Avatar'
import { Post } from '@interfaces/blog'
import { getPosts, getPostBySlug } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {}

const Article: React.FC<Props> = ({
  author,
  excerpt,
  image,
  publishedAt,
  readingTime,
  source,
  tags,
  title,
  updatedAt,
  words,
}) => {
  const pageMetaData: PageMetaData = {
    author: author.name,
    description: excerpt,
    image: image!,
    publishedAt,
    tags: tags.map(({ name }) => name),
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
      <hr className="divider" />
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getPosts()

  return {
    fallback: false,
    paths: posts.map(({ slug }) => `/blog/${slug}`),
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> =
  async ctx => {
    try {
      const post = await getPostBySlug(ctx.params!.slug)
      return {
        props: post,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
