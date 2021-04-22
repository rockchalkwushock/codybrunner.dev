import * as React from 'react'
import { GitHub, Linkedin, Twitter } from 'react-feather'

import { constants } from '@utils/constants'

export const SocialIcons: React.FC = () => {
  return (
    <>
      <li>
        <a
          aria-label="Link to Cody Brunner's Github"
          className="text-primary"
          href={constants.externalLinks.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHub className="lg:h-7 lg:w-7" />
        </a>
      </li>
      <li>
        <a
          aria-label="Link to Cody Brunner's LinkedIn"
          className="text-primary"
          href={constants.externalLinks.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin className="lg:h-7 lg:w-7" />
        </a>
      </li>
      <li>
        <a
          aria-label="Link to Cody Brunner's Twitter"
          className="text-primary"
          href={constants.externalLinks.twitter}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter className="lg:h-7 lg:w-7" />
        </a>
      </li>
    </>
  )
}
