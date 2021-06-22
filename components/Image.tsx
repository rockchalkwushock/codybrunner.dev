import * as React from 'react'
import NextImage, { ImageLoader, ImageProps } from 'next/image'

// This is used for <Books />, <TopArtists />, <TopTracks />, etc.
export const externalURLLoader: ImageLoader = ({ src }) => src

// This is used for images on the About page, my Avatar.
export const Image: React.FC<ImageProps> = props => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <NextImage {...props} />
}
