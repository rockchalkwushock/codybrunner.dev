import * as React from 'react'
import { AppProps } from 'next/app'

import '../styles/global.scss'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <div className="container flex flex-col flex-grow items-center justify-center mx-auto relative w-full">
      <Component {...pageProps} />
    </div>
  )
}

export default App
