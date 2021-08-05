import * as React from 'react'
import NextLink from 'next/link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  slug: string
}

export const PostLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, onClick, slug, ...rest }, ref) => {
    return (
      <NextLink
        href={{ pathname: '/blog/[...slug]', query: { slug: slug.split('/') } }}
        passHref
        // We set this to false so we don't get the wonky behavior of NextLink scrolling
        // us to the top of the page and then framer-motion initiating the page transition.
        scroll={false}
      >
        <a {...rest} onClick={onClick} ref={ref}>
          {children}
        </a>
      </NextLink>
    )
  }
)
