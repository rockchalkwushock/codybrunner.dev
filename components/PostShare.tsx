import * as React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'

interface Props
  extends Pick<Post, 'canonicalUrl' | 'description' | 'tags' | 'title'> {}

export const PostShare: React.FC<Props> = ({
  canonicalUrl,
  description,
  tags,
  title,
}) => {
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
        <EmailShareButton subject={title} url={canonicalUrl}>
          <EmailIcon round size="32" />
        </EmailShareButton>
        <FacebookShareButton quote={description} url={canonicalUrl}>
          <FacebookIcon round size="32" />
        </FacebookShareButton>
        <LinkedinShareButton
          source={constants.url}
          summary={description}
          title={title}
          url={canonicalUrl}
        >
          <LinkedinIcon round size="32" />
        </LinkedinShareButton>
        <RedditShareButton title={title} url={canonicalUrl}>
          <RedditIcon round size="32" />
        </RedditShareButton>
        <TelegramShareButton title={title} url={canonicalUrl}>
          <TelegramIcon round size="32" />
        </TelegramShareButton>
        <TwitterShareButton
          hashtags={tags ? tags.map(t => t) : undefined}
          title={title}
          url={canonicalUrl}
        >
          <TwitterIcon round size="32" />
        </TwitterShareButton>
        <WhatsappShareButton title={title} url={canonicalUrl}>
          <WhatsappIcon round size="32" />
        </WhatsappShareButton>
      </div>
    </div>
  )
}
