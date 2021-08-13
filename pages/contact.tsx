import * as React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { useAppointletEmbed } from '@hooks/useAppointletEmbed'
import { constants } from '@utils/constants'

interface Props {}

const Contact: React.FC<Props> = () => {
  const { asPath } = useRouter()
  useAppointletEmbed()
  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description="Ways in which to contact Cody A Brunner"
        openGraph={{
          description: 'Ways in which to contact Cody A Brunner',
          url: `${constants.url}${asPath}`,
        }}
        title="Contact"
      />
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
