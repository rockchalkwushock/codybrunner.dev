import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { constants } from '@utils/constants'

const Custom404: React.FC = () => {
  const { asPath } = useRouter()
  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description="404 - Not Found"
        openGraph={{
          description: '404 - Not Found',
          url: `${constants.url}${asPath}`,
        }}
        title="Not Found"
      />
      <h1 className="font-bold mb-8 text-4xl text-center">Oops! 🤭</h1>
      <div className="flex flex-col items-center mb-8 p-4 space-y-12">
        <p className="font-semibold text-center text-xl">
          Looks like you took a trip down the wrong worm hole to get here.
        </p>
        <h1 className="font-semibold text-lg">Your options are:</h1>
        <ol className="flex flex-col font-semibold list-decimal list-inside space-y-2 text-lg">
          <li>Take the blue pill and return to your prefabricated reality</li>
          <li>Take the red pill and a lot of acid and see what happens</li>
        </ol>
        <div className="flex justify-evenly w-full">
          <NextLink href="/">
            <button className="bg-accent-blue px-10 py-2 md:px-16 md:py-3 rounded-lg shadow-md transform-gpu hover:bg-gradient-to-r hover:from-brand hover:via-accent-green hover:to-blue-500 hover:fin hover:scale-110 hover:translate-y-2">
              💊
            </button>
          </NextLink>
          <a
            aria-label="Go trip acid"
            className="bg-accent-red px-10 py-2 md:px-16 md:py-3 rounded-lg shadow-md transform-gpu hover:bg-gradient-to-r hover:from-brand hover:via-accent-green hover:to-blue-500 hover:fin hover:scale-110 hover:translate-y-2"
            href="https://www.youtube.com/watch?v=3KObylIFm-c"
            rel="noopener noreferrer"
            target="_blank"
          >
            💊
          </a>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Custom404
