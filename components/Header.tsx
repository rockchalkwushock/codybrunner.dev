import * as React from 'react'
import { useRouter } from 'next/router'

import { AnimatedMenuItem, AnimatedMobileNav } from './AnimatedMobileNav'
import { MenuLink } from './MenuLink'
import { constants } from '@utils/constants'
import { isServer } from '@utils/helpers'

export const Header: React.FC = () => {
  const { asPath } = useRouter()
  const [show, setShow] = React.useState<'hidden' | 'flex'>('flex')

  React.useEffect(() => {
    if (!isServer && window.innerWidth >= 1024) {
      window.addEventListener('scroll', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScroll = React.useCallback(
    () => setShow(window.pageYOffset >= 100 ? 'hidden' : 'flex'),
    []
  )

  return (
    <header
      className={`bg-transparent ${show} grid-in-header items-center justify-between sticky top-0 w-full z-50`}
    >
      <div className="hidden lg:flex lg:items-center lg:space-x-32 lg:text-2xl">
        <h1 className="lg:font-semibold lg:text-brand">codybrunner.dev</h1>
        <ul className="flex space-x-8">
          {constants.menu.map(({ path, text }) => (
            <AnimatedMenuItem
              aria-disabled={asPath === path}
              className="text-center w-full hover:font-semibold hover:text-accent-yellow"
              key={text.toLowerCase()}
            >
              <MenuLink
                aria-disabled={asPath === path}
                className={`flex items-center justify-center ${
                  asPath === path
                    ? 'font-semibold text-brand underline'
                    : 'group'
                }`}
                to={path}
              >
                <span
                  aria-disabled={asPath === path}
                  className="lg:group-hover:ease-in-out lg:group-hover:scale-105 lg:group-hover:transform-gpu lg:group-hover:transition"
                >
                  {text.toLowerCase()}
                </span>
              </MenuLink>
            </AnimatedMenuItem>
          ))}
        </ul>
      </div>
      <AnimatedMobileNav />
    </header>
  )
}
