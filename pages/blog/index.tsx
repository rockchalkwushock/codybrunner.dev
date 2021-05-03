import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostListItem } from '@components/PostListItem'
import { Post } from '@interfaces/blog'
import { getAllPostsFrontMatter } from '@utils/mdx'

interface Props {
  posts: Array<Post>
}

const BlogIndex: React.FC<Props> = ({ posts }) => {
  const pageMetaData: PageMetaData = {
    description: "Cody Brunner's personal and technology blog.",
    title: 'codybrunner.dev | Blog',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <ul className="flex flex-col mb-8 overflow-scroll space-y-6 lg:space-y-4">
        {posts.map(({ frontMatter }) => (
          <PostListItem
            dateFormat="day-month"
            frontMatter={frontMatter}
            key={frontMatter.slug}
          />
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await getAllPostsFrontMatter()
    console.log(posts.map(p => p.frontMatter.slug))
    return {
      props: {
        posts,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default BlogIndex
