import * as React from 'react'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { TopArtists } from '@components/TopArtists'
import { TopTracks } from '@components/TopTracks'

const Dashboard: React.FC = () => {
  const pageMetaData: PageMetaData = {
    description: 'Dashboard of various things Cody is up too.',
    title: 'codybrunner.dev | Dashboard',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <TopArtists />
      <TopTracks />
    </AnimatedPage>
  )
}

export default Dashboard
