import * as React from 'react'
import NextLink from 'next/link'
import { motion, MotionProps } from 'framer-motion'

type MenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps & {
    to: string
  }

export const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, onClick, to, ...rest }, ref) => {
    return (
      <NextLink href={to} passHref>
        <motion.a {...rest} onClick={onClick} ref={ref}>
          {children}
        </motion.a>
      </NextLink>
    )
  }
)
