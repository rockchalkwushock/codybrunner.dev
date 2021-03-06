import * as React from 'react'
import { FastForward, Rewind } from 'react-feather'

import { PostLink } from './PostLink'
import { Post } from '@interfaces/blog'

interface Props extends Pick<Post, 'slug'> {
  direction: 'next' | 'prev'
}

export const PaginationButton: React.FC<Props> = ({ direction, slug }) => {
  return (
    <PostLink
      className="duration-300 ease-in-out group pagination-button transform-gpu transition hover:scale-105 hover:translate-y-1"
      slug={slug}
    >
      {direction === 'prev' && <Rewind className="h-8 w-8" />}
      {direction === 'next' && <FastForward className="h-8 w-8" />}
    </PostLink>
  )
}
