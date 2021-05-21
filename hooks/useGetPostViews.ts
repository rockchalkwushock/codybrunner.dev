import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

import { fetchPostViews } from '@lib/supabaseClient'
import { appRegex } from '@utils/constants'

type UseGetPostViews = () => Pick<
  UseQueryResult<number, unknown>,
  'data' | 'status'
>

export const useGetPostViews: UseGetPostViews = () => {
  const { asPath } = useRouter()
  const slug = asPath.replace(appRegex.blog, '')

  const { data, status } = useQuery(['get-post-views', slug], fetchPostViews)

  return { data, status }
}
