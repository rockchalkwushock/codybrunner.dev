import * as React from 'react'
import { GetStaticProps } from 'next'
import { PostOrPage } from '@tryghost/content-api'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { getPage } from '@lib/ghost-cms'

interface Props {
  page: PostOrPage
}

const About: React.FC<Props> = ({ page }) => {
  const pageMetaData: PageMetaData = {
    description: 'About page',
    title: 'codybrunner.dev | About',
    type: 'article',
  }
  console.log(page)
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <h1>About Page</h1>
    </AnimatedPage>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const page = await getPage('about')
    return { props: { page } }
  } catch (error) {
    throw new Error(error)
  }
}

export default About
