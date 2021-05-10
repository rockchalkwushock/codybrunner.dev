import * as React from 'react'

import { SocialIcons } from './SocialIcons'
import { constants } from '@utils/constants'
import { Avatar } from './Avatar'

export const Aside: React.FC = () => {
  return (
    <aside className="grid-in-aside hidden lg:flex md:flex-col md:items-center md:p-4">
      <Avatar className="h-48 mb-4 w-48" />
      <ul className="flex flex-col items-center">
        <li className="mb-4 text-accent text-2xl lg:text-3xl">
          {constants.author}
        </li>
        <li className="h-10 mb-4">
          <ul className="flex space-x-4">
            <SocialIcons />
          </ul>
        </li>
        <li className="bg-accent flex flex-col items-center justify-center p-2 rounded-lg shadow-md w-48">
          <p className="text-coolGray-50 text-center dark:text-coolGray-900 lg:text-lg">
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
