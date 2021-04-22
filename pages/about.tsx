import * as React from 'react'
import { GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Post } from '@interfaces/blog'
import { MDXLayout } from '@layouts/MDXLayout'
import { getMDXBySlug, prepareMDX } from '@lib/mdx'

interface Props extends Post {}

const About: React.FC<Props> = ({ frontMatter, source }) => {
  const pageMetaData: PageMetaData = {
    createdAt: frontMatter.createdAt,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    tags: frontMatter.tags,
    title: 'codybrunner.dev | About',
    type: 'article',
    updatedAt: frontMatter.updatedAt,
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <MDXLayout frontMatter={frontMatter} source={source} />
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
