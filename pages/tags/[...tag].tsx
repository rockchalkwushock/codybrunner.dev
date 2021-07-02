import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostListItem } from '@components/PostListItem'
import { Post } from '@interfaces/blog'
import {
  byDate,
  getAllPostsFrontMatter,
  getPostsByTag,
  getTags,
  sortPosts,
} from '@utils/mdx'

interface Props {
  posts: Array<Post>
  tag: string
}

const Topic: React.FC<Props> = ({ posts, tag }) => {
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
        {posts.map(({ frontMatter }) => (
          <PostListItem
            dateFormat="yr-mo-da"
            frontMatter={frontMatter}
            key={frontMatter.slug}
          />
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsFrontMatter()
  const filePaths = getTags(posts).map(tag => ({ params: { tag: [tag] } }))

  return {
    fallback: false,
    paths: filePaths,
  }
}

export const getStaticProps: GetStaticProps<Props, { tag: Array<string> }> =
  async ctx => {
    const tag = ctx.params!.tag[0]
    const posts = await getAllPostsFrontMatter()
    const postsByTag = getPostsByTag(posts, tag)

    try {
      return {
        props: {
          posts: sortPosts(postsByTag, byDate).reverse(),
          tag,
        },
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Topic
