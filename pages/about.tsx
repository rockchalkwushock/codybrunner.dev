import * as React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ArticleJsonLd, NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { PostLayout } from '@layouts/PostLayout'
import { Post } from '@interfaces/blog'
import { readGhostPageOrPost } from '@lib/ghost-cms'
import { constants } from '@utils/constants'

interface Props extends Omit<Post, 'tags'> {}

const technologies = [
  'apollographql',
  'bootstrap',
  'chakra-ui',
  'css3',
  'django',
  'elixir',
  'fly.io',
  'gatsbyjs',
  'ghost-cms',
  'graphql',
  'heroku',
  'html5',
  'javascript',
  'mongodb',
  'netlify',
  'nextjs',
  'nodejs',
  'phoenix',
  'postgresql',
  'python',
  'reactjs',
  'react-query',
  'redux',
  'styled-components',
  'tailwindcss',
  'typescript',
  'vercel',
  'x-state',
]

const customTags = [
  'Colombia',
  'expatriate',
  'Frontend Developer',
  'Fullstack Developer',
  'Software Developer',
  'Web Developer',
  ...technologies,
]

const About: React.FC<Props> = ({ ...post }) => {
  const { asPath } = useRouter()

  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description={post.excerpt}
        openGraph={{
          article: {
            authors: [constants.author],
            modifiedTime: post.updatedAt,
            publishedTime: post.publishedAt,
            tags: customTags,
          },
          type: 'article',
          url: `${constants.url}${asPath}`,
        }}
        title={post.title}
      />
      <ArticleJsonLd
        authorName={[constants.author]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        description={post.excerpt}
        // TODO
        images={[]}
        // TODO
        publisherLogo=""
        publisherName={constants.author}
        title={post.title}
        url={`${constants.url}${asPath}`}
      />
      <PostLayout {...post} />
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const page = await readGhostPageOrPost({
      params: {
        include: ['authors'],
      },
      slug: ['about'],
      isPage: true,
    })

    return { props: { ...page } }
  } catch (error) {
    throw new Error(error)
  }
}

export default About
