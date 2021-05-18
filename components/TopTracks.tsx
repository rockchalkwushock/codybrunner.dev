import * as React from 'react'
import { Loader } from 'react-feather'

import { useTopTracks } from '@hooks/useTopTracks'

export const TopTracks: React.FC = () => {
  const { data, status } = useTopTracks()
  return status === 'error' ? (
    <div className="hidden" />
  ) : (
    <>
      {status === 'loading' && <Loader className="animate-spin h-12 w-12" />}
      {status === 'success' && data && (
        <div className="border border-transparent flex flex-col p-4 rounded-lg shadow-md">
          <header className="flex items-center justify-center mb-4 w-full">
            <h2 className="font-medium italic text-2xl">Top Tracks</h2>
          </header>
          <ol className="flex flex-col space-y-2">
            {data.map(({ album, artist, image, name, url }) => (
              <li className="p-4 rounded-lg shadow-md" key={url}>
                <a
                  className="flex items-center space-x-6"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt={name}
                    className="h-16 rounded-full w-16"
                    src={image.url}
                  />
                  <div className="flex flex-col space-y-0 5">
                    <span className="font-medium text-xl">{name}</span>
                    <span className="text-secondary">{album}</span>
                    <span className="text-secondary">{artist}</span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}