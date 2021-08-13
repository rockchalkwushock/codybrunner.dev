import * as React from 'react'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'
// import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/global.scss'
import SEO from '../next-seo.config'
import { Aside } from '@components/Aside'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { constants } from '@utils/constants'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps, router }) => {
  const queryClientRef = React.useRef<QueryClient>()

  const { instagram, linkedin, twitter } = constants.externalLinks

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  const handleExit = React.useCallback(
    () => typeof window !== 'undefined' && window.scrollTo(0, 0),
    []
  )

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <DefaultSeo {...SEO} />
      <SocialProfileJsonLd
        name={constants.author}
        sameAs={[instagram, linkedin, twitter]}
        type="Person"
        url={constants.url}
      />
      <div className="gap-y-2 grid grid-areas-mobile grid-cols-mobile grid-rows-mobile min-h-screen md:gap-8 md:grid-areas-tablet md:grid-cols-tablet md:grid-rows-tablet lg:grid-areas-desktop lg:grid-cols-desktop lg:grid-rows-desktop">
        <Header />
        <Aside />
        <AnimatePresence exitBeforeEnter onExitComplete={handleExit}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
        <Footer />
      </div>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  )
}

export default App
