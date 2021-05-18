import * as React from 'react'
// import { GetStaticPaths, GetStaticProps } from 'next'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
// import {} from '@interfaces/'
// import {} from '@hooks/'
// import {} from '@utils/'

// interface Params {}

interface Props {}

const Dashboard: React.FC<Props> = ({ children }) => {
  const pageMetaData: PageMetaData = {
    description: 'Dashboard of various things cody is up to',
    title: 'codybrunner.dev | Dashboard',
    type: 'website',
  }
  return <AnimatedPage pageMetaData={pageMetaData}>{children}</AnimatedPage>
}

// export const getStaticPaths: GetStaticPaths = async () => {}

// export const getStaticProps: GetStaticProps<Props, Params> = async ctx => {}

export default Dashboard
