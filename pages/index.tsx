import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { PostLink } from '@components/PostLink'
import { GetPostsResponse } from '@interfaces/blog'
import { getPosts } from '@lib/ghost-cms'
import { formatDateTime } from '@utils/dateTime'

interface Props extends GetPostsResponse {}

const Home: React.FC<Props> = ({ posts }) => {
  const pageMetaData: PageMetaData = {
    description: 'My stretch of pipe in the world wide inter-tubes.',
    title: 'codybrunner.dev | Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="font-medium mb-4 text-3xl underline">Ghost CMS Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <PostLink slug={post.slug}>
              <a>
                <h2>{post.title}</h2>
                <span>
                  {formatDateTime(post.publishedAt, 'full-date-localized')}
                </span>
              </a>
            </PostLink>
          </li>
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { pagination, posts } = await getPosts()

    return {
      props: {
        pagination,
        posts,
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
