import * as React from 'react'
import { GetStaticProps } from 'next'
import { PostsOrPages } from '@tryghost/content-api'
import NextLink from 'next/link'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { ArchivedPost } from '@components/ArchivedPost'
import { PostListItem } from '@components/PostListItem'
import { getGhostPosts } from '@lib/ghost-cms'
import { Post } from '@interfaces/blog'
import {
  createArchivedPostMap,
  filterPosts,
  getAllPostsFrontMatter,
} from '@utils/mdx'
import { formatDateTime } from '@utils/dateTime'

interface Props {
  archive: Record<string, Array<Post>>
  ghostPosts: PostsOrPages
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ archive, ghostPosts, posts }) => {
  const pageMetaData: PageMetaData = {
    description: 'My stretch of pipe in the world wide inter-tubes.',
    title: 'codybrunner.dev | Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="font-medium mb-4 text-3xl underline">Ghost CMS Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {ghostPosts.map(post => (
          <li key={post.id}>
            {console.log(post)}
            <NextLink
              href={{
                pathname: '/posts/[...slug]',
                query: { slug: post.slug },
              }}
              passHref
              scroll={false}
            >
              <a>
                <h2>{post.title}</h2>
                <span>
                  {post.published_at &&
                    formatDateTime(post.published_at, 'full-date-localized')}
                </span>
              </a>
            </NextLink>
          </li>
        ))}
      </ul>
      <h1 className="font-medium mb-4 text-3xl underline">Latest Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(({ frontMatter }) => (
          <PostListItem
            dateFormat="day-month"
            frontMatter={frontMatter}
            key={frontMatter.slug}
          />
        ))}
      </ul>
      <h1 className="font-medium mb-4 text-3xl underline">Archive</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {Object.keys(archive).map(year => (
          <div key={year}>
            <h2 className="font-medium mb-4 text-accent-magenta text-2xl">
              {year}
            </h2>
            <ul className="flex flex-col space-y-6 lg:ml-4 lg:space-y-4">
              {archive[year].map(({ frontMatter, source }) => (
                <ArchivedPost frontMatter={frontMatter} key={source} />
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await getAllPostsFrontMatter()
    const ghostPosts = await getGhostPosts()

    return {
      props: {
        archive: createArchivedPostMap(
          filterPosts(posts, p => p.frontMatter.archived)
        ),
        ghostPosts,
        // All posts for current year.
        posts: filterPosts(posts, p => !p.frontMatter.archived),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
