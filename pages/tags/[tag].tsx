import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostCard } from '@components/PostCard'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { getPostsByTags, getTags } from '@lib/ghost-cms'

interface Props {
  posts: Array<Post>
  tag: string
  tags: Array<{ count: number; name?: string; slug: string }>
}

const Topic: React.FC<Props> = ({ posts, tag, tags }) => {
  const pageMetaData: PageMetaData = {
    description: `All posts on Cody Brunner's blog that are tagged with the ${tag} tag.`,
    title: tag,
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div className="flex-container">
        <h1 className="heading">
          Posts tagged with:{' '}
          <span className="font-bold text-accent-yellow">{tag}</span>
        </h1>
        <ul className="post-card-grid">
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      </div>

      <hr className="divider" />

      <div className="flex-container">
        <h2 className="heading">Other Tags</h2>
        <ul className="gap-4 grid grid-cols-3 md:grid-cols-5 overflow-y-scroll">
          {tags.map(tag => (
            <li key={tag.slug}>
              <Tag tag={tag.name!} />
            </li>
          ))}
        </ul>
      </div>
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
