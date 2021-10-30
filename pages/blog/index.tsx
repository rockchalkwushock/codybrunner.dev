import * as React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { BlogJsonLd, NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'

import { PostCard } from '@components/PostCard'
import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'
import { getAllPostsFrontMatter } from '@utils/mdx'

interface Props {
  posts: Array<Post>
}

const BlogIndex: React.FC<Props> = ({ posts }) => {
  const { asPath } = useRouter()
  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description="My musings about the everyday challenges of life and things I have learned in software development."
        openGraph={{
          description:
            'My musings about the everyday challenges of life and things I have learned in software development.',
          url: `${constants.url}${asPath}`,
        }}
        title="Blog"
      />
      <BlogJsonLd
        authorName={constants.author}
        dateModified={posts[0].updatedAt!}
        datePublished={posts[0].publishedAt || posts[0].createdAt}
        description="My musings about the everyday challenges of life and things I have learned in software development."
        images={[]}
        title="codybrunner-dev.vercel.app | Blog"
        url={`${constants.url}${asPath}`}
      />
      <div className="flex-container">
        <h1 className="heading">My Blog</h1>
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
  const posts = await getAllPostsFrontMatter()

  return {
    props: {
      // Descending published order.
      posts: posts.reverse(),
    },
  }
}

export default BlogIndex
