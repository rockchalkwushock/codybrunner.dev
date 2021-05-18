import * as React from 'react'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Books } from '@components/Books'
import { GitHub } from '@components/GitHub'
import { TopArtists } from '@components/TopArtists'
import { TopTracks } from '@components/TopTracks'
import { DashboardLayout } from '@layouts/DashboardLayout'

const Dashboard: React.FC = () => {
  const pageMetaData: PageMetaData = {
    description: 'Dashboard of various things Cody is up too.',
    title: 'codybrunner.dev | Dashboard',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <DashboardLayout>
        {/* Books is static so it should always be first. */}
        <Books />
        {/* Dynamic UI */}
        <GitHub />
        <TopArtists />
        <TopTracks />
      </DashboardLayout>
    </AnimatedPage>
  )
}

export default Dashboard
