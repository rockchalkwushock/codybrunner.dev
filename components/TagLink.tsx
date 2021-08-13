import * as React from 'react'
import NextLink from 'next/link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: string
}

export const TagLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, onClick, tag, ...rest }, ref) => {
    return (
      <NextLink
        href={{ pathname: '/tags/[tag]', query: { tag } }}
        passHref
        scroll={false}
      >
        <a {...rest} onClick={onClick} ref={ref}>
          {children}
        </a>
      </NextLink>
    )
  }
)
