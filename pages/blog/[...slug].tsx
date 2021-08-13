import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { MDXLayout } from '@layouts/MDXLayout'
import { appRegex, paths } from '@utils/constants'
import { getFiles } from '@utils/helpers'
import { getAllPostsFrontMatter, getRelatedPosts, parsePost } from '@utils/mdx'

interface Props extends Post {
  relatedPosts?: Array<Post>
}

const Article: React.FC<Props> = post => {
  return (
    <AnimatedPage>
      <NextSeo
        canonical={post.canonicalUrl}
        description={post.description}
        openGraph={{
          article: {
            authors: [post.author],
            modifiedTime: post.updatedAt ?? undefined,
            publishedTime: post.publishedAt ?? undefined,
            tags: post.tags ?? undefined,
          },
          type: 'article',
          url: post.canonicalUrl,
        }}
        title={post.title}
      />
      <ArticleJsonLd
        authorName={[post.author]}
        datePublished={post.publishedAt || post.createdAt}
        dateModified={post.updatedAt ?? undefined}
        description={post.description}
        // TODO
        images={[]}
        // TODO
        publisherLogo=""
        publisherName={post.author}
        title={post.title}
        url={post.canonicalUrl}
      />
      <MDXLayout {...post} />
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = getFiles(paths.blog, appRegex.blogSource)
    // Remove file extensions for page paths.
    .map(path => path.replace(appRegex.mdx, ''))
    // Map the path into the static paths object required by Next.js
    // "slug" is declares as a catch-all route in the file system
    // so it needs to be an array.
    .map(slug => ({ params: { slug: slug.split('/') } }))

  return {
    fallback: false,
    paths: filePaths,
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: Array<string> }> =
  async ctx => {
    try {
      const post = await parsePost(ctx.params!.slug.join('/'))
      const posts = await getAllPostsFrontMatter()

      return {
        props: {
          ...post,
          nextPost: posts.find(p => p.nextPost === post.slug)?.slug || null,
          previousPost:
            posts.find(p => p.previousPost === post.slug)?.slug || null,
          relatedPosts: getRelatedPosts(post, posts),
        },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
