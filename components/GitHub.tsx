import * as React from 'react'
import { Loader } from 'react-feather'

import { useGitHub } from '@hooks/useGitHub'

export const GitHub: React.FC = () => {
  const { data, status } = useGitHub()
  return status === 'error' ? (
    <div className="hidden" />
  ) : (
    <>
      {status === 'loading' && <Loader className="animate-spin h-12 w-12" />}
      {status === 'success' && data && (
        <div className="flex flex-col p-2">
          <header className="flex items-center justify-center mb-4 w-full">
            <h2 className="font-medium italic text-accent text-2xl">
              GitHub Activity
            </h2>
          </header>
          <ol className="flex flex-col space-y-2">
            {data.pullRequests.map(
              ({ id, number, permalink, repository, title }) => (
                <li
                  className="bg-accent p-4 rounded-lg shadow-md text-accent-secondary"
                  key={id}
                >
                  <a
                    className="flex items-center"
                    href={permalink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="flex-grow-0 flex-shrink rounded-full text-sm">
                        #{number}
                      </span>
                      <div className="flex flex-col flex-grow overflow-x-hidden text-sm md:text-base">
                        <span
                          className="font-medium truncate"
                          style={{ maxWidth: '16.25rem' }}
                        >
                          {title}
                        </span>
                        <span className="opacity-70">
                          {repository.nameWithOwner}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              )
            )}
          </ol>
        </div>
      )}
    </>
  )
}
