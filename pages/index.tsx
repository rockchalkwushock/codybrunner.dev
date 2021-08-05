import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostCard } from '@components/PostCard'
import { Post } from '@interfaces/blog'
import { browseGhostPosts } from '@lib/ghost-cms'

interface Props {
  featured: Array<Post>
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
        <ul className="post-card-grid">
          {featured.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
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
    const featured = await browseGhostPosts({
      filter: 'featured:true',
      include: ['authors', 'tags'],
      order: 'published_at DESC',
    })
    const posts = await browseGhostPosts({
      include: ['authors', 'tags'],
      limit: '5',
      order: 'published_at DESC',
    })

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
