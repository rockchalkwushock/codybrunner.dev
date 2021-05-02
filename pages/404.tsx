import * as React from 'react'
import NextLink from 'next/link'

import { AnimatedPage } from '@components/AnimatedPage'
import { useAmplitude } from '@hooks/useAmplitude'

const Custom404: React.FC = () => {
  const { setEvent } = useAmplitude(true)
  return (
    <AnimatedPage
      pageMetaData={{
        description: '404 - Not Found',
        keywords: ['Not Found'],
        title: 'codybrunner.dev | Not Found',
        type: 'website',
      }}
    >
      <h1 className="mb-8 text-4xl text-center">Oops! 🤭</h1>
      <div className="bg-secondary border border-transparent flex flex-col mb-8 p-4 rounded-lg shadow-md space-y-4">
        <p className="font-semibold text-center text-lg">
          Looks like you took a trip down the wrong worm hole to get here.
        </p>
        <h2>Your options are:</h2>
        <ol className="flex flex-col space-y-2">
          <li className="list-decimal list-inside">
            Take the blue pill and return to your prefabricated reality
          </li>
          <li className="list-decimal list-inside">
            Take the red pill and a lot of acid and see what happens
          </li>
        </ol>
        <div className="flex justify-evenly">
          <NextLink href="/">
            <button
              className="bg-blue-500 px-8 py-2 rounded-lg shadow-md"
              onClick={() => setEvent('User navigated home from 404.')}
            >
              💊
            </button>
          </NextLink>
          <a
            aria-label="Go trip acid"
            className="bg-red-500 px-8 py-2 rounded-lg shadow-md"
            href="https://www.youtube.com/watch?v=3KObylIFm-c"
            onClick={() => setEvent('User chose to trip acid.')}
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
