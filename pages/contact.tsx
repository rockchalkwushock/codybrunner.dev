import * as React from 'react'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { useAppointletEmbed } from '@hooks/useAppointletEmbed'

interface Props {}

const Contact: React.FC<Props> = () => {
  useAppointletEmbed()
  const pageMetaData: PageMetaData = {
    description: 'Ways in which to contact cody brunner',
    title: 'codybrunner.dev | Contact',
    type: 'website',
  }
  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <div id="appointlet-section" className="flex flex-col mb-6 space-y-2">
        <h1 className="text-center text-2xl">Use Appointlet!</h1>
        <p className="text-center">I built this software!!! 🎉🎉🎉</p>
        {/*
          Appointlet Booking Page will be injected
          here by useAppointletEmbed().
        */}
      </div>
    </AnimatedPage>
  )
}

export default Contact
