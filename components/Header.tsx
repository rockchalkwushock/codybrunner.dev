import * as React from 'react'

import { AnimatedMobileNav } from './AnimatedMobileNav'
import { ThemeToggle } from './ThemeToggle'

export const Header: React.FC = () => {
  return (
    <header className="bg-primary flex grid-in-header items-center justify-between sticky top-0 w-full z-50">
      <h1 className="hidden lg:block lg:text-accent lg:text-2xl">
        codybrunner.dev
      </h1>
      <AnimatedMobileNav />
      <ThemeToggle />
    </header>
  )
}
