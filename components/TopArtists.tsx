import * as React from 'react'
import { Loader } from 'react-feather'

import { useTopArtists } from '@hooks/useTopArtists'

export const TopArtists: React.FC = () => {
  const { data, status } = useTopArtists()
  return status === 'error' ? (
    <div className="hidden" />
  ) : (
    <>
      {status === 'loading' && <Loader className="animate-spin h-12 w-12" />}
      {status === 'success' && data && (
        <div className="border border-transparent flex flex-col p-4 rounded-lg shadow-md">
          <header className="flex items-center justify-center mb-4 w-full">
            <h2 className="font-medium italic text-2xl">Top Artists</h2>
          </header>
          <ol className="flex flex-col space-y-2">
            {data.map(({ image, name, url }) => (
              <li className="p-4 rounded-lg shadow-md" key={url}>
                <a href={url} rel="noopener noreferrer" target="_blank">
                  <img
                    alt={name}
                    className="h-16 rounded-full w-16"
                    src={image.url}
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
