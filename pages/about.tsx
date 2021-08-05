import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
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
  constants.author,
  'Colombia',
  'expatriate',
  'Frontend Developer',
  'Fullstack Developer',
  'Software Developer',
  'Web Developer',
  ...technologies,
]

const About: React.FC<Props> = ({ ...post }) => {
  const pageMetaData: PageMetaData = {
    description: post.excerpt,
    image: post.image!,
    publishedAt: post.publishedAt,
    tags: customTags,
    title: post.title,
    type: 'article',
    updatedAt: post.updatedAt,
    wordCount: post.words,
  }

  return (
    <AnimatedPage pageMetaData={pageMetaData}>
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
