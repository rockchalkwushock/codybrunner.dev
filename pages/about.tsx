import * as React from 'react'
import { GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { MDXLayout } from '@layouts/MDXLayout'
import { getMDXBySlug, prepareMDX } from '@lib/mdx'

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
  'Colombia',
  'expatriate',
  'Frontend Developer',
  'Fullstack Developer',
  'Software Developer',
  'Web Developer',
  ...technologies,
]

const About: React.FC<Props> = post => {
  return (
    <AnimatedPage>
      <NextSeo
        canonical={post.canonicalUrl}
        description={post.description}
        openGraph={{
          article: {
            authors: [post.author],
            modifiedTime: post.updatedAt ?? undefined,
            publishedTime: post.publishedAt ?? undefined,
            tags: customTags,
          },
          type: 'article',
          url: post.canonicalUrl,
        }}
        title={post.title}
      />
      <ArticleJsonLd
        authorName={[post.author]}
        datePublished={post.publishedAt || post.createdAt}
        dateModified={post.updatedAt ?? undefined}
        description={post.description}
        // TODO
        images={[]}
        // TODO
        publisherLogo=""
        publisherName={post.author}
        title={post.title}
        url={post.canonicalUrl}
      />
      <MDXLayout {...post} />
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const source = await getMDXBySlug('about', 'about')
  const post = await prepareMDX(source)
  return { props: { ...post } }
}

export default About
