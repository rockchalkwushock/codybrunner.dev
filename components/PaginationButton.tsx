import * as React from 'react'
import { FastForward, Rewind } from 'react-feather'

import { PostLink } from './PostLink'
import { Post } from '@interfaces/blog'

interface Props extends Pick<Post['frontMatter'], 'slug'> {
  direction: 'next' | 'prev'
}

export const PaginationButton: React.FC<Props> = ({ direction, slug }) => {
  return (
    <PostLink className="pagination-button" slug={slug}>
      {direction === 'prev' && <Rewind />}
      {direction === 'next' && <FastForward />}
    </PostLink>
  )
}
