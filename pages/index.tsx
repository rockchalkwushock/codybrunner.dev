import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { ArchivedPost } from '@components/ArchivedPost'
import { PostListItem } from '@components/PostListItem'
import { Post } from '@interfaces/blog'
import {
  createArchivedPostMap,
  filterPosts,
  getAllPostsFrontMatter,
} from '@utils/mdx'

interface Props {
  archive: Record<string, Array<Post>>
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ archive, posts }) => {
  const pageMetaData: PageMetaData = {
    description: 'My stretch of pipe in the world wide inter-tubes.',
    title: 'codybrunner.dev | Home',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="mb-4 text-2xl">Latest Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(({ frontMatter }) => (
          <PostListItem
            dateFormat="day-month"
            frontMatter={frontMatter}
            key={frontMatter.slug}
          />
        ))}
      </ul>
      <h1 className="mb-4 text-2xl">Archive</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {Object.keys(archive).map(year => (
          <div key={year}>
            <h2 className="mb-4 text-xl underline">{year}</h2>
            <ul className="flex flex-col space-y-6">
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

    return {
      props: {
        archive: createArchivedPostMap(
          filterPosts(posts, p => p.frontMatter.archived)
        ),
        // Give the client the 3 latest posts.
        posts: filterPosts(posts, p => !p.frontMatter.archived).slice(-5),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
