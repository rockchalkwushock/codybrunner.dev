import * as React from 'react'
import { Loader } from 'react-feather'

import { useStrava } from '@hooks/useStrava'

export const StravaActivity: React.FC = () => {
  const { data, status } = useStrava()
  return status === 'error' ? (
    <div className="hidden" />
  ) : (
    <>
      {status === 'loading' && <Loader className="animate-spin h-12 w-12" />}
      {status === 'success' && data && (
        <div className="flex flex-col p-2">
          <header className="flex items-center justify-center mb-4 w-full">
            <h2 className="font-medium italic text-accent text-2xl">
              Strava Activity
            </h2>
          </header>
          <h4 className="font-medium italic mb-2 text-accent text-lg underline">
            YTD Totals
          </h4>
          <div className="bg-accent flex flex-col mb-4 p-4 rounded-lg shadow-md text-accent-secondary">
            <span className="text-lg">
              Total Distance Ran: {data.totals.ytdRunDistance}
            </span>
            <span className="opacity-70 text-lg">
              Total Runs: {data.totals.ytdTotalRuns}
            </span>
          </div>

          <h4 className="font-medium italic mb-2 text-accent text-lg underline">
            Weekly Activity
          </h4>
          <ol className="flex flex-col space-y-2">
            {data.activities.length === 0 && <p>No Activity Yet.</p>}
            {data.activities.map(({ date, distance, name, time }) => (
              <li
                className="bg-accent flex flex-col p-4 rounded-lg shadow-md text-accent-secondary text-lg"
                key={`${date}--${time}`}
              >
                <span className="font-semibold">
                  {date}: {name}
                </span>
                <span>
                  {distance} -- {time}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
