import * as React from 'react'
import { useRouter } from 'next/router'
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'

interface Props extends Pick<Post, 'frontMatter'> {}

export const PostShare: React.FC<Props> = ({ frontMatter }) => {
  const { asPath } = useRouter()
  // Parse URL for sharing.
  const url = `${constants.url}${asPath}`
  return (
    <div className="flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:justify-between">
      <div>
        <p className="text-center lg:text-left lg:text-lg">
          Like what you read?
        </p>
        <p className="text-center lg:text-left lg:text-lg">
          Feel free to share with others!
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <EmailShareButton subject={frontMatter.title} url={url}>
          <EmailIcon round size="32" />
        </EmailShareButton>
        <LinkedinShareButton
          source={constants.url}
          summary={frontMatter.description}
          title={frontMatter.title}
          url={url}
        >
          <LinkedinIcon round size="32" />
        </LinkedinShareButton>
        <RedditShareButton title={frontMatter.title} url={url}>
          <RedditIcon round size="32" />
        </RedditShareButton>
        <TelegramShareButton title={frontMatter.title} url={url}>
          <TelegramIcon round size="32" />
        </TelegramShareButton>
        <TwitterShareButton
          hashtags={frontMatter.tags.map(t => t)}
          title={frontMatter.title}
          url={url}
        >
          <TwitterIcon round size="32" />
        </TwitterShareButton>
      </div>
    </div>
  )
}
