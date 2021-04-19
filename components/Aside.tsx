import * as React from 'react'
import NextImage from 'next/image'

import { SocialIcons } from './SocialIcons'
import { constants } from '@utils/constants'

export const Aside: React.FC = () => {
  return (
    <aside className="hidden md:col-start-1 md:col-end-3 md:flex md:flex-col md:items-center md:space-y-4">
      <div className="h-48 rounded-full w-48">
        <NextImage
          alt={constants.author}
          className="rounded-full"
          height="300"
          objectFit="cover"
          src="/images/me.jpg"
          width="300"
        />
      </div>
      <ul className="flex flex-col items-center space-y-4">
        <li className="text-xl lg:text-2xl">{constants.author}</li>
        <li className="min-h-min">
          <ul className="flex space-x-4">
            <SocialIcons />
          </ul>
        </li>
        <li className="flex flex-col items-center justify-center p-4 rounded-lg md:w-2/3 lg:w-1/2">
          <p className="text-center lg:text-lg">
            Cody is a {constants.age} year old American software developer,
            Jayhawk, and US Navy veteran originally hailing from the boondocks
            of Kansas and now currently living with his wife and step-doggo in{' '}
            {constants.location}.
          </p>
        </li>
      </ul>
    </aside>
  )
}
