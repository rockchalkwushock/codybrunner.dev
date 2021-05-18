import { useQuery, UseQueryResult } from 'react-query'

import { GitHub } from '@interfaces/github'
import { fetchGitHub } from '@lib/github'

type UseGitHub = () => UseQueryResult<GitHub, unknown>

export const useGitHub: UseGitHub = () => {
  return useQuery('github', fetchGitHub)
}
