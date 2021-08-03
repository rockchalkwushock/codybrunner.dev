import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostLink } from '@components/PostLink'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { getPostsByTags, getTags } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

interface Props {
  posts: Array<Post>
  tag: string
  tags: Array<{ count: number; name?: string; slug: string }>
}

const Topic: React.FC<Props> = ({ posts, tag, tags }) => {
  const pageMetaData: PageMetaData = {
    description: `All posts on Cody Brunner's blog that are tagged with the ${tag} tag.`,
    title: `codybrunner.dev | ${tag}`,
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="font-medium mb-4 text-center text-3xl">
        Posts tagged with:{' '}
        <span className="font-bold text-accent-yellow">{tag}</span>
      </h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <PostLink slug={post.slug}>
              <h2>{post.title}</h2>
              <span>
                {formatDateTime(post.publishedAt, 'full-date-localized')}
              </span>
            </PostLink>
          </li>
        ))}
      </ul>
      <hr className="divider" />
      <h2 className="font-medium mb-4 text-center text-xl">Other Tags</h2>
      <ul className="gap-4 grid grid-cols-3 md:grid-cols-5 mb-8 overflow-y-scroll p-2">
        {tags.map(tag => (
          <li key={tag.slug}>
            <Tag tag={tag.name!} />
          </li>
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = (await getTags()).map(tag => ({
    params: { tag: tag.slug },
  }))

  return {
    fallback: false,
    paths: filePaths,
  }
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> =
  async ctx => {
    const posts = await getPostsByTags(ctx.params!.tag)
    const tags = await getTags()
    try {
      return {
        props: {
          posts,
          tag: ctx.params!.tag,
          tags,
        },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Topic
