import * as React from 'react'
import { useRouter } from 'next/router'
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

interface Props extends Pick<Post, 'excerpt' | 'tags' | 'title'> {}

export const PostShare: React.FC<Props> = ({ excerpt, tags, title }) => {
  const { asPath } = useRouter()
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
        <EmailShareButton subject={title} url={url}>
          <EmailIcon round size="32" />
        </EmailShareButton>
        <FacebookShareButton quote={excerpt} url={url}>
          <FacebookIcon round size="32" />
        </FacebookShareButton>
        <LinkedinShareButton
          source={constants.url}
          summary={excerpt}
          title={title}
          url={url}
        >
          <LinkedinIcon round size="32" />
        </LinkedinShareButton>
        <RedditShareButton title={title} url={url}>
          <RedditIcon round size="32" />
        </RedditShareButton>
        <TelegramShareButton title={title} url={url}>
          <TelegramIcon round size="32" />
        </TelegramShareButton>
        <TwitterShareButton
          hashtags={tags ? tags.map(t => t.name) : undefined}
          title={title}
          url={url}
        >
          <TwitterIcon round size="32" />
        </TwitterShareButton>
        <WhatsappShareButton title={title} url={url}>
          <WhatsappIcon round size="32" />
        </WhatsappShareButton>
      </div>
    </div>
  )
}
