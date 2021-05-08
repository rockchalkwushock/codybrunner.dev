import * as React from 'react'
import { GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

import { constants } from '@utils/constants'

export const SocialIcons: React.FC = () => {
  return (
    <>
      <li className="group social-button hover:bg-black dark:hover:bg-white dark:hover:text-black">
        <a
          aria-label="Link to Cody Brunner's Github"
          href={constants.externalLinks.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHub className="group-hover:animate-wiggle" />
        </a>
      </li>
      <li className="group social-button hover:bg-instagram">
        <a
          aria-label="Link to Cody Brunner's Instagram"
          href={constants.externalLinks.instagram}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram className="group-hover:animate-wiggle" />
        </a>
      </li>
      <li className="group social-button hover:bg-linkedIn">
        <a
          aria-label="Link to Cody Brunner's LinkedIn"
          href={constants.externalLinks.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin className="group-hover:animate-wiggle" />
        </a>
      </li>
      <li className="group social-button hover:bg-twitter">
        <a
          aria-label="Link to Cody Brunner's Twitter"
          href={constants.externalLinks.twitter}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter className="group-hover:animate-wiggle" />
        </a>
      </li>
    </>
  )
}
