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
  archivedPosts: Record<string, Array<Post>>
  posts: Array<Post>
}

const BlogIndex: React.FC<Props> = ({ archivedPosts, posts }) => {
  const pageMetaData: PageMetaData = {
    description: "Cody Brunner's personal and technology blog.",
    title: 'codybrunner.dev | Blog',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1 className="mb-4 text-accent text-2xl text-center">Latest Posts</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {posts.map(({ frontMatter }) => (
          <PostListItem
            dateFormat="day-month"
            frontMatter={frontMatter}
            key={frontMatter.slug}
          />
        ))}
      </ul>
      <h1 className="mb-4 text-accent text-2xl text-center">Archive</h1>
      <ul className="flex flex-col mb-8 overflow-y-scroll p-2 space-y-6 lg:space-y-4">
        {Object.keys(archivedPosts).map(year => (
          <div key={year}>
            <h2 className="mb-4 text-accent text-xl underline">{year}</h2>
            <ul className="flex flex-col space-y-6">
              {archivedPosts[year].map(({ frontMatter, source }) => (
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
        archivedPosts: createArchivedPostMap(
          filterPosts(posts, p => p.frontMatter.archived)
        ),
        posts: filterPosts(posts, p => !p.frontMatter.archived),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default BlogIndex
