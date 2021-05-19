// import {} from 'fs'
// import {} from 'path'
import { QueryFunctionContext } from 'react-query'
import { Strava as StravaClient } from 'strava'
import { endOfWeek, getUnixTime, startOfWeek } from 'date-fns'

import { Maybe } from '@interfaces/helpers'
import { Strava } from '@interfaces/strava'
import { formatDateTime, formatStravaSeconds } from '@utils/dateTime'

const client = new StravaClient({
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_CLIENT_SECRET,
  refresh_token: process.env.STRAVA_REFRESH_TOKEN,
})

/**
 * CLIENT-SIDE QUERIES
 */

export async function fetchStrava(
  _context: QueryFunctionContext
): Promise<Maybe<Strava>> {
  try {
    const response = await fetch('/api/strava/data')
    return (await response.json()) as Maybe<Strava>
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * SERVER-SIDE QUERIES
 */

export async function getStrava(): Promise<Maybe<Strava>> {
  const date = new Date()
  try {
    // Define request for activities.
    const activitiesRequest = client.activities.getLoggedInAthleteActivities({
      // Bound the query to the current weeks activities.
      after: getUnixTime(startOfWeek(date)),
      before: getUnixTime(endOfWeek(date)),
    })
    // Define request for stats.
    const statsRequest = client.athletes.getStats({ id: 41805170 })

    // Here we can batch our requests.
    // NOTE: If any request fails Promise.all will reject!
    const [activities, stats] = await Promise.all([
      activitiesRequest,
      statsRequest,
    ])

    if (!activities || !stats) {
      return Promise.reject(null)
    }

    return Promise.resolve({
      activities: activities.map(a => ({
        date: formatDateTime(a.start_date_local, 'short-weekday'),
        distance: `${(a.distance / 1000).toFixed(2)} km`,
        name: a.name,
        time: formatStravaSeconds(a.elapsed_time),
        type: a.type,
      })),
      totals: {
        ytdRunDistance: `${(stats.ytd_run_totals.distance / 1000).toFixed(
          2
        )} km`,
        ytdTotalRuns: stats.all_run_totals.count,
      },
    })
  } catch (error) {
    throw new Error(error)
  }
}
