import * as React from 'react'

import { SocialIcons } from './SocialIcons'
import { NowPlaying } from './NowPlaying'
import { constants } from '@utils/constants'

export const Footer: React.FC = () => {
  return (
    <footer className="grid-in-footer flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex flex-col items-center space-y-4 md:flex-col-reverse md:items-start md:space-y-2">
        <NowPlaying />
        <a
          aria-label="Link to source code on GitHub"
          className="text-primary lg:text-lg"
          href={constants.externalLinks.source}
          rel="noopener noreferrer"
          target="_blank"
        >{`${constants.copyright} ${constants.author}`}</a>
      </div>
      <ul className="flex items-center justify-center pb-8 space-x-6 md:space-x-4">
        <SocialIcons />
      </ul>
    </footer>
  )
}
