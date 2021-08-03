import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'

import { PostCard } from '@components/PostCard'
import { Post } from '@interfaces/blog'
import { getPosts } from '@lib/ghost-cms'

interface Props {
  posts: Array<Post>
}

const BlogIndex: React.FC<Props> = ({ posts }) => {
  const pageMetaData: PageMetaData = {
    description:
      'My musings about the everyday challenges of life and things I have learned in software development.',
    title: 'codybrunner.dev | Blog',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="font-medium mb-8 text-3xl text-center underline lg:text-left">
        My Blog
      </h1>
      <ul className="gap-8 grid grid-cols-1 justify-items-center lg:justify-items-start">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await getPosts()

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
