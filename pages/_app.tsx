import * as React from 'react'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import '../styles/global.scss'
import { AppNav } from '@components/AppNav'
import { Aside } from '@components/Aside'
import { Footer } from '@components/Footer'
import { OpenToWorkBanner } from '@components/OpenToWorkBanner'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps, router }) => {
  const handleExit = React.useCallback(
    () => typeof window !== 'undefined' && window.scrollTo(0, 0),
    []
  )
  return (
    <div className="container flex flex-col flex-grow items-center justify-center mx-auto relative w-full">
      <OpenToWorkBanner />
      <AppNav />
      <main className="flex-grow grid grid-cols-1 h-full mt-10 w-full md:gap-8 md:grid-cols-5 md:mt-0">
        <Aside />
        <AnimatePresence exitBeforeEnter onExitComplete={handleExit}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
