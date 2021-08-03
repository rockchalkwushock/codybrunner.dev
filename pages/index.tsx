import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostCard } from '@components/PostCard'
import { Post } from '@interfaces/blog'
import { getFeaturedPosts, getLatestPosts } from '@lib/ghost-cms'

interface Props {
  featured: Post
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ featured, posts }) => {
  const pageMetaData: PageMetaData = {
    description: 'My stretch of pipe in the world wide inter-tubes.',
    title: 'codybrunner.dev | Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div className="flex flex-col items-center mb-16 space-y-8 lg:items-start lg:space-y-4">
        <h1 className="font-medium mb-4 text-3xl underline">Featured Post</h1>
        <PostCard {...featured} />
      </div>
      <div className="flex flex-col items-center space-y-8 lg:items-start lg:space-y-4">
        <h1 className="font-medium mb-4 text-3xl underline">Latest Posts</h1>
        <ul className="gap-8 grid grid-cols-1 justify-items-center lg:justify-items-start">
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
    const featured = await getFeaturedPosts()
    const posts = await getLatestPosts('5')

    return {
      props: {
        featured,
        posts,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
