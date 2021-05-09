import * as React from 'react'
import { useRouter } from 'next/router'

import { AnimatedMenuItem, AnimatedMobileNav } from './AnimatedMobileNav'
import { MenuLink } from './MenuLink'
import { ThemeToggle } from './ThemeToggle'
import { constants } from '@utils/constants'

export const Header: React.FC = () => {
  const { asPath } = useRouter()
  return (
    <header className="bg-primary flex grid-in-header items-center justify-between sticky top-0 w-full z-50">
      <div className="hidden lg:flex lg:items-center lg:space-x-40 lg:text-accent lg:text-2xl">
        <h1 className="">codybrunner.dev</h1>
        <ul className="flex space-x-8">
          {constants.menu.slice(0, 3).map(({ path, text }) => (
            <AnimatedMenuItem
              aria-disabled={asPath === path}
              className="text-center w-full"
            >
              <MenuLink
                aria-disabled={asPath === path}
                className={`flex items-center justify-center ${
                  asPath === path
                    ? 'font-semibold text-fuchsia-500 underline'
                    : 'group'
                }`}
                to={path}
              >
                <span
                  aria-disabled={asPath === path}
                  className="lg:group-hover:text-teal-600 lg:group-hover:ease-in-out lg:group-hover:scale-105 lg:group-hover:transform-gpu lg:group-hover:transition"
                >
                  {text.toLowerCase()}
                </span>
              </MenuLink>
            </AnimatedMenuItem>
          ))}
        </ul>
      </div>
      <AnimatedMobileNav />
      <ThemeToggle />
    </header>
  )
}
