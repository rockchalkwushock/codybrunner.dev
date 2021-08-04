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
    title: 'Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div className="flex-container mb-16">
        <h1 className="heading">Featured Post</h1>
        <PostCard {...featured} />
      </div>

      <div className="flex-container">
        <h1 className="heading">Latest Posts</h1>
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
