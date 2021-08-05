import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { PostLayout } from '@layouts/PostLayout'
import { browseGhostPosts, readGhostPageOrPost } from '@lib/ghost-cms'

interface Props extends Post {
  relatedPosts: Array<Post>
}

const Article: React.FC<Props> = ({ relatedPosts, ...post }) => {
  const pageMetaData: PageMetaData = {
    description: post.excerpt,
    image: post.image!,
    publishedAt: post.publishedAt,
    tags: post.tags!.map(({ name }) => name),
    title: post.title,
    type: 'article',
    updatedAt: post.updatedAt,
    wordCount: post.words,
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <PostLayout {...post} relatedPosts={relatedPosts} />
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await browseGhostPosts({
    include: ['authors', 'tags'],
    limit: 'all',
    order: 'published_at DESC',
  })

  return {
    fallback: false,
    paths: posts.map(({ slug }) => `/blog/${slug}`),
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: Array<string> }> =
  async ctx => {
    try {
      let relatedPosts: Array<Post> = []
      const post = await readGhostPageOrPost({
        params: { include: ['authors', 'tags'] },
        slug: ctx.params!.slug,
      }).then(async post => {
        const tags = post.tags!.map(({ name }) => name).join(', ')
        relatedPosts = await browseGhostPosts({
          // Find posts with the following tags, but not the current post
          // https://gist.github.com/ErisDS/f516a859355d515aa6ad
          filter: `tags:[${tags}] + slug:-${ctx.params!.slug.join('-')}`,
          include: ['authors', 'tags'],
          // Only return 3 posts.
          limit: '3',
          order: 'published_at DESC',
        })
        return post
      })

      return {
        props: { ...post, relatedPosts },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
