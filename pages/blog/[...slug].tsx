import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { PostLayout } from '@layouts/PostLayout'
import { getPosts, getPostBySlug, getRelatedPosts } from '@lib/ghost-cms'

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
        post.tags!.map(t => t.name)
      )

      return {
        props: { ...post, relatedPosts },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
