import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { isEqual } from 'date-fns'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Avatar } from '@components/Avatar'
import { PostLink } from '@components/PostLink'
import { PostShare } from '@components/PostShare'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { getPosts, getPostBySlug, getRelatedPosts } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

interface Props extends Post {
  relatedPosts: Array<Post>
}

const Article: React.FC<Props> = ({
  author,
  excerpt,
  image,
  publishedAt,
  readingTime,
  relatedPosts,
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

        <div className="flex flex-col items-center md:flex-row md:space-x-2">
          <ul className="flex space-x-2">
            {tags.map(tag => (
              <Tag key={tag.name} tag={tag.name}>
                {tag.name}
              </Tag>
            ))}
          </ul>
        </div>
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
              {relatedPosts.map(({ slug, title }) => (
                <PostLink key={slug} slug={slug}>
                  <h2 className="text-brand text-lg underline hover:font-semibold hover:text-accent-yellow">
                    {title}
                  </h2>
                </PostLink>
              ))}
            </ul>
          </section>
          <hr className="divider" />
        </>
      )}
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()

  return {
    fallback: false,
    paths: posts.map(({ slug }) => `/blog/${slug}`),
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: Array<string> }> =
  async ctx => {
    try {
      const post = await getPostBySlug(ctx.params!.slug)
      const relatedPosts = await getRelatedPosts(
        ctx.params!.slug,
        post.tags.map(t => t.name)
      )

      return {
        props: { ...post, relatedPosts },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
