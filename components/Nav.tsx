import * as React from 'react'
import { useRouter } from 'next/router'

import { AnimatedMenuItem } from './AnimatedMobileNav'
import { MenuLink } from './MenuLink'
import { constants } from '@utils/constants'

export const Nav: React.FC = () => {
  const { asPath } = useRouter()
  return (
    <nav className="grid-in-nav mx-4 md:border-b md:border-t md:border-fuchsia-900 md:flex md:justify-end md:dark:border-teal-200 lg:mx-0">
      <ul className="hidden md:gap-4 md:grid md:grid-areas-nav md:grid-cols-nav md:grid-rows-nav md:h-52 md:py-8">
        {constants.menu.slice(1).map(({ path, text }) => (
          <AnimatedMenuItem
            aria-disabled={asPath === path}
            className="text-center"
            key={text}
          >
            <MenuLink
              aria-disabled={asPath === path}
              className={`flex items-center justify-center ${
                asPath === path
                  ? 'bg-fuchsia-400 dark:bg-teal-600 border border-fuchsia-400 dark:border-teal-600 font-semibold px-4 py-1 rounded-full'
                  : 'group'
              }`}
              to={path}
            >
              <span
                aria-disabled={asPath === path}
                className="text-accent text-xl lg:group-hover:bg-fuchsia-400 lg:dark:group-hover:bg-teal-600 lg:group-hover:border lg:group-hover:border-fuchsia-400 lg:dark:group-hover:border-teal-600 lg:group-hover:duration-300 lg:group-hover:ease-in-out lg:group-hover:px-4 lg:group-hover:py-1 lg:group-hover:rounded-full lg:group-hover:scale-105 lg:group-hover:shadow-md lg:group-hover:transform-gpu lg:group-hover:transition lg:group-hover:uppercase"
              >
                {text.toLowerCase()}
              </span>
            </MenuLink>
          </AnimatedMenuItem>
        ))}
      </ul>
    </nav>
  )
}
