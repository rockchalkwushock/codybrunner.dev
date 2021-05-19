import { useQuery, UseQueryResult } from 'react-query'

import { TopTrack } from '@interfaces/spotify'
import { fetchTopTracks } from '@lib/spotify'

type UseTopTracks = () => UseQueryResult<Array<TopTrack>, unknown>

export const useTopTracks: UseTopTracks = () => {
  return useQuery('top-tracks', fetchTopTracks)
}
