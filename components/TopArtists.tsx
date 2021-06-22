import * as React from 'react'
import { Loader } from 'react-feather'

import { Image, externalURLLoader } from './Image'
import { useTopArtists } from '@hooks/useTopArtists'

export const TopArtists: React.FC = () => {
  const { data, status } = useTopArtists()
  return status === 'error' ? (
    <div className="hidden" />
  ) : (
    <>
      {status === 'loading' && <Loader className="animate-spin h-12 w-12" />}
      {status === 'success' && data && (
        <div className="flex flex-col p-2">
          <header className="flex items-center justify-center mb-4 w-full">
            <h2 className="font-medium italic text-accent text-2xl">
              Top Artists
            </h2>
          </header>
          <ol className="flex flex-col space-y-2">
            {data.map(({ image, name, url }) => (
              <li
                className="bg-accent p-4 rounded-lg shadow-md text-accent-secondary"
                key={url}
              >
                <a
                  className="flex items-center space-x-6"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={name}
                    className="h-16 rounded-full w-16"
                    height={64}
                    loader={externalURLLoader}
                    src={image.url}
                    width={64}
                  />
                  <span className="text-xl">{name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
