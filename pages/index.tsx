import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostLink } from '@components/PostLink'
import { Post } from '@interfaces/blog'
import { getFeaturedPosts, getLatestPosts } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

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
      <h1 className="font-medium mb-4 text-3xl underline">Featured Post</h1>
      <PostLink slug={featured.slug}>
        <h2>{featured.title}</h2>
        <span>
          {formatDateTime(featured.publishedAt, 'full-date-localized')}
        </span>
      </PostLink>
      <h1 className="font-medium mb-4 text-3xl underline">Latest Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <PostLink slug={post.slug}>
              <h2>{post.title}</h2>
              <span>
                {formatDateTime(post.publishedAt, 'full-date-localized')}
              </span>
            </PostLink>
          </li>
        ))}
      </ul>
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
