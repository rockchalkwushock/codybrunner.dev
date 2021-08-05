import * as React from 'react'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { useAppointletEmbed } from '@hooks/useAppointletEmbed'

interface Props {}

const Contact: React.FC<Props> = () => {
  useAppointletEmbed()
  const pageMetaData: PageMetaData = {
    description: 'Ways in which to contact cody brunner',
    title: 'Contact',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div id="appointlet-section" className="flex flex-col mb-6 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-medium text-2xl">Use Appointlet!</h1>
          <p className="text-lg">🎉🎉🎉 I built this software!!! 🎉🎉🎉</p>
        </div>
        {/*
          Appointlet Booking Page will be injected
          here by useAppointletEmbed().
        */}
      </div>
    </AnimatedPage>
  )
}

export default Contact
