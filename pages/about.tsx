import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { MDXLayout } from '@layouts/MDXLayout'
import { getMDXBySlug, prepareMDX } from '@lib/mdx'
import { constants } from '@utils/constants'

interface Props extends Post {}

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

const About: React.FC<Props> = post => {
  const pageMetaData: PageMetaData = {
    description: post.description,
    publishedAt: post.publishedAt,
    tags: customTags,
    title: post.title,
    type: 'article',
    updatedAt: post.updatedAt,
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <MDXLayout {...post} />
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const source = await getMDXBySlug('about', 'about')
    const post = await prepareMDX(source)
    return { props: { ...post } }
  } catch (error) {
    throw new Error(error)
  }
}

export default About
