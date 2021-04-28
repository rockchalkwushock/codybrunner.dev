import { useQuery, UseQueryResult } from 'react-query'

import { CurrentEpisode, CurrentTrack, RecentTrack } from '@interfaces/spotify'
import { fetchNowPlaying } from '@lib/spotify'

type UseNowPlaying = () => UseQueryResult<
  CurrentEpisode | CurrentTrack | RecentTrack,
  unknown
>

export const useNowPlaying: UseNowPlaying = () => {
  return useQuery('now-playing', fetchNowPlaying, {
    // 2 minutes and 10 seconds.
    cacheTime: 130000,
    keepPreviousData: true,
    // TODO: Add in some logging here to notify me if the request
    // is failing so I can fix it fast.
    onError: () => {},
    // 2 minutes.
    staleTime: 120000,
  })
}
