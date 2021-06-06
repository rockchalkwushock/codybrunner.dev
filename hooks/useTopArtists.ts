import { useQuery, UseQueryResult } from 'react-query'

import { TopArtist } from '@interfaces/spotify'
import { fetchTopArtists } from '@lib/spotify'

type UseTopArtists = () => UseQueryResult<Array<TopArtist>, unknown>

export const useTopArtists: UseTopArtists = () => {
  return useQuery('top-artists', fetchTopArtists)
}
