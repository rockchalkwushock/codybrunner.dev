import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { motion, MotionProps } from 'framer-motion'

type MenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps & {
    to: string
  }

export const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, onClick, to, ...rest }, ref) => {
    const { asPath } = useRouter()
    return (
      <NextLink href={to} passHref>
        <motion.a
          {...rest}
          className={`text-accent text-2xl ${asPath === to ? '' : ''}`}
          onClick={onClick}
          ref={ref}
        >
          <span className="">{children}</span>
        </motion.a>
      </NextLink>
    )
  }
)
