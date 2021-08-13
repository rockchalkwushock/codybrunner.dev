import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage } from '@components/AnimatedPage'
import { PostCard } from '@components/PostCard'
import { Post } from '@interfaces/blog'
import { filterPosts, getAllPostsFrontMatter } from '@utils/mdx'

interface Props {
  featured: Array<Post>
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ featured, posts }) => {
  return (
    <AnimatedPage>
      <div className="flex-container mb-16">
        <h1 className="heading">Featured Post</h1>
        <ul className="post-card-grid">
          {featured.map(post => (
            <PostCard key={post.slug} {...post} />
          ))}
        </ul>
      </div>

      <div className="flex-container">
        <h1 className="heading">Latest Posts</h1>
        <ul className="post-card-grid">
          {posts.map(post => (
            <PostCard key={post.slug} {...post} />
          ))}
        </ul>
      </div>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await getAllPostsFrontMatter()
    const featured = filterPosts(posts, ({ featured }) => !!featured)

    return {
      props: {
        featured,
        posts: posts.reverse().slice(0, 5),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
