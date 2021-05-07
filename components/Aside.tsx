import * as React from 'react'

import { SocialIcons } from './SocialIcons'
import { constants } from '@utils/constants'
import { Avatar } from './Avatar'

export const Aside: React.FC = () => {
  return (
    <aside className="grid-in-aside hidden md:flex md:flex-col md:items-center md:p-4">
      <Avatar className="h-48 mb-4 w-48" />
      <ul className="flex flex-col items-center">
        <li className="mb-4 text-2xl lg:text-3xl">{constants.author}</li>
        <li className="h-10 mb-4">
          <ul className="flex space-x-4">
            <SocialIcons />
          </ul>
        </li>
        <li className="bg-secondary flex flex-col items-center justify-center rounded-lg w-48">
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
