import { useQuery, UseQueryResult } from 'react-query'

import { Maybe } from '@interfaces/helpers'
import { Strava } from '@interfaces/strava'
import { fetchStrava } from '@lib/strava'

type UseStrava = () => UseQueryResult<Maybe<Strava>, unknown>

export const useStrava: UseStrava = () => {
  return useQuery('strava', fetchStrava)
}
