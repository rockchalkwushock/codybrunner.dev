import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostListItem } from '@components/PostListItem'
import { Post } from '@interfaces/blog'
import { getAllPostsFrontMatter } from '@utils/mdx'

interface Props {
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ posts }) => {
  const pageMetaData: PageMetaData = {
    description: 'My stretch of pipe in the world wide inter-tubes.',
    title: 'codybrunner.dev | Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="mb-4 text-2xl">Latest Posts</h1>
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

    return {
      props: {
        posts,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
