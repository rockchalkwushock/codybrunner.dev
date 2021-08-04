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
    title: 'Blog',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div className="flex-container">
        <h1 className="heading">My Blog</h1>
        <ul className="post-card-grid">
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      </div>
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
