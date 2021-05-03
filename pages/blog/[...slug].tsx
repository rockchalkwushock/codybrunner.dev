import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { MDXLayout } from '@layouts/MDXLayout'
import { appRegex, paths } from '@utils/constants'
import { getFiles } from '@utils/helpers'
import { getAllPostsFrontMatter, parsePost } from '@utils/mdx'

interface Props extends Post {}

const Article: React.FC<Props> = ({
  frontMatter,
  nextPost,
  previousPost,

  source,
}) => {
  const pageMetaData: PageMetaData = {
    createdAt: frontMatter.createdAt,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    tags: frontMatter.tags,
    title: `codybrunner.dev | ${frontMatter.title}`,
    type: 'article',
    updatedAt: frontMatter.updatedAt,
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <MDXLayout
        frontMatter={frontMatter}
        nextPost={nextPost}
        previousPost={previousPost}
        source={source}
      />
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
  console.log(filePaths.map(f => f.params.slug))
  return {
    fallback: false,
    paths: filePaths,
  }
}

export const getStaticProps: GetStaticProps<
  Props,
  { slug: Array<string> }
> = async ctx => {
  try {
    const post = await parsePost(ctx.params!.slug.join('/'))
    const posts = await getAllPostsFrontMatter()
    console.log(posts.map(p => p.frontMatter.slug))
    return {
      props: {
        ...post,
        nextPost:
          posts.find(p => p.nextPost === post.frontMatter.slug)?.frontMatter
            .slug || null,
        previousPost:
          posts.find(p => p.previousPost === post.frontMatter.slug)?.frontMatter
            .slug || null,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Article
