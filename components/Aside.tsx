import * as React from 'react'

import { SocialIcons } from './SocialIcons'
import { constants } from '@utils/constants'
import { Avatar } from './Avatar'

export const Aside: React.FC = () => {
  return (
    <aside className="grid-in-aside hidden lg:flex md:flex-col md:items-center md:p-4">
      <Avatar className="h-48 mb-4 w-48" />
      <ul className="flex flex-col items-center">
        <li className="font-medium mb-4 text-brand text-2xl lg:text-3xl">
          {constants.author}
        </li>
        <li className="h-10 mb-4">
          <ul className="flex space-x-4">
            <SocialIcons />
          </ul>
        </li>
        <li className="bg-gray-dark flex flex-col items-center justify-center p-3 rounded-lg shadow-md text-secondary w-48">
          <p className="italic text-center lg:text-lg">{constants.bio}</p>
        </li>
      </ul>
    </aside>
  )
}
