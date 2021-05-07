import * as React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/global.scss'
import { Footer } from '@components/Footer'
import { initAmplitudeJS } from '@lib/amplitude'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps, router }) => {
  const queryClientRef = React.useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

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
        <header className="border-2 border-red-100 grid-in-header"></header>
        <nav className="border-2 border-teal-100 grid-in-nav p-4 md:flex md:justify-end">
          <ul className="hidden md:gap-4 md:grid md:grid-areas-nav md:grid-cols-nav md:grid-rows-nav md:place-items-center">
            <li className="">Home</li>
            <li className="">About</li>
            <li className="">Blog</li>
            <li className="">Contact</li>
            <li className="">Projects</li>
            <li className="">Resume</li>
          </ul>
        </nav>
        <aside className="border-2 border-yellow-100 grid-in-aside"></aside>
        <Component {...pageProps} key={router.asPath} />
        <Footer />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App
