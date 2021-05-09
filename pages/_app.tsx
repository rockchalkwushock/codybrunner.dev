import * as React from 'react'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/global.scss'
import { Nav } from '@components/Nav'
import { Aside } from '@components/Aside'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { initAmplitudeJS } from '@lib/amplitude'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps, router }) => {
  const queryClientRef = React.useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  const handleExit = React.useCallback(
    () => typeof window !== 'undefined' && window.scrollTo(0, 0),
    []
  )

  // Initialize Amplitude Services.
  React.useEffect(() => initAmplitudeJS())

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider
        // This needs to match what is being used in tailwind.config.js
        attribute="class"
        // The key that will put in localStorage.
        storageKey="codybrunner.dev-theme"
      >
        <div className="gap-y-2 grid grid-areas-mobile grid-cols-mobile grid-rows-mobile min-h-screen md:gap-8 md:grid-areas-tablet md:grid-cols-tablet md:grid-rows-tablet lg:grid-areas-desktop lg:grid-cols-desktop lg:grid-rows-desktop">
          <Header />
          <Nav />
          <Aside />
          <AnimatePresence exitBeforeEnter onExitComplete={handleExit}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
          <Footer />
        </div>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  )
}

export default App
