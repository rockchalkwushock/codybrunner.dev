import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { PostCard } from '@components/PostCard'
import { Tag } from '@components/Tag'
import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'
import {
  byDate,
  getAllPostsFrontMatter,
  getPostsByTag,
  getTags,
  sortPosts,
} from '@utils/mdx'

interface Props {
  posts: Array<Post>
  tag: string
  tags: Array<string>
}

const Topic: React.FC<Props> = ({ posts, tag, tags }) => {
  const { asPath } = useRouter()
  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description={`All posts on Cody Brunner's blog that are tagged with the ${tag} tag.`}
        openGraph={{
          description: `All posts on Cody Brunner's blog that are tagged with the ${tag} tag.`,
          url: `${constants.url}${asPath}`,
        }}
        title={tag}
      />
      <div className="flex-container">
        <h1 className="heading">
          Posts tagged with:{' '}
          <span className="font-bold text-accent-yellow">{tag}</span>
        </h1>
        <ul className="post-card-grid">
          {posts.map(post => (
            <PostCard key={post.slug} {...post} />
          ))}
        </ul>
      </div>

      <hr className="divider" />

      <div className="flex-container">
        <h2 className="heading">Other Tags</h2>
        <ul className="gap-4 grid grid-cols-3 md:grid-cols-5 overflow-y-scroll">
          {tags.map(tag => (
            <li key={tag}>
              <Tag tag={tag} />
            </li>
          ))}
        </ul>
      </div>
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsFrontMatter()
  const filePaths = getTags(posts).map(tag => ({ params: { tag } }))

  return {
    fallback: false,
    paths: filePaths,
  }
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> =
  async ctx => {
    const tag = ctx.params!.tag
    const posts = await getAllPostsFrontMatter()
    const postsByTag = getPostsByTag(posts, tag)
    const tags = getTags(posts)
      // Remove the current tag from the list of all other tags.
      .filter(t => t !== tag)
      .sort((a, b) => (a > b ? 1 : -1))

    return {
      props: {
        posts: sortPosts(postsByTag, byDate).reverse(),
        tag,
        tags,
      },
    }
  }

export default Topic
