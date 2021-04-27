import * as React from 'react'
import { GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

import { constants } from '@utils/constants'

export const SocialIcons: React.FC = () => {
  return (
    <>
      <li>
        <a
          aria-label="Link to Cody Brunner's Github"
          href={constants.externalLinks.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHub className="h-7 w-7" />
        </a>
      </li>
      <li>
        <a
          aria-label="Link to Cody Brunner's Instagram"
          href={constants.externalLinks.instagram}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram className="h-7 w-7" />
        </a>
      </li>
      <li>
        <a
          aria-label="Link to Cody Brunner's LinkedIn"
          href={constants.externalLinks.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin className="h-7 w-7" />
        </a>
      </li>
      <li>
        <a
          aria-label="Link to Cody Brunner's Twitter"
          href={constants.externalLinks.twitter}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter className="h-7 w-7" />
        </a>
      </li>
    </>
  )
}
