import * as React from 'react'

import { SocialIcons } from './SocialIcons'
import { constants } from '@utils/constants'

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center pb-4 space-y-2 w-full md:flex-row-reverse md:justify-between md:px-4 md:space-y-0">
      <ul className="flex items-center space-x-6 md:space-x-4">
        <SocialIcons />
      </ul>
      <div className="flex flex-col items-center space-y-2 md:items-start md:space-y-0">
        <a
          aria-label="Link to source code on Github"
          className="hover-text text-primary lg:text-lg"
          href={constants.externalLinks.source}
          rel="noopener noreferrer"
          target="_blank"
        >
          {`${constants.copyright} ${constants.author}`}
        </a>
      </div>
    </footer>
  )
}
