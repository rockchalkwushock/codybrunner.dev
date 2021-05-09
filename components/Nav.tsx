import * as React from 'react'

import { AnimatedMenuItem } from './AnimatedMobileNav'
import { MenuLink } from './MenuLink'
import { constants } from '@utils/constants'

export const Nav: React.FC = () => {
  return (
    <nav className="grid-in-nav mx-4 md:border-b md:border-t md:border-fuchsia-900 md:flex md:justify-end md:dark:border-teal-200 lg:mx-0">
      <ul className="hidden md:gap-4 md:grid md:grid-areas-nav md:grid-cols-nav md:grid-rows-nav md:py-8">
        {constants.menu.map(({ path, text }) => (
          <AnimatedMenuItem key={text}>
            <MenuLink to={path}>{text}</MenuLink>
          </AnimatedMenuItem>
        ))}
      </ul>
    </nav>
  )
}
