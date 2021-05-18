import { SummaryActivity } from 'strava'

export interface AthleteStats {
  ytdRunDistance: string
  ytdTotalRuns: number
}

export interface Activity extends Pick<SummaryActivity, 'name' | 'type'> {
  date: string
  distance: string
  time: string
}

export interface Strava {
  activities: Array<Activity>
  totals: AthleteStats
}
