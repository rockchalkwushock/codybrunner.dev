// import * as React from 'react'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

// import {} from '@interfaces/supabase'
import { fetchPostViews } from '@lib/supabaseClient'
import { appRegex } from '@utils/constants'

type UseGetPostViews = () => UseQueryResult<unknown, unknown>

export const useGetPostViews: UseGetPostViews = () => {
  const { asPath } = useRouter()
  const slug = asPath.replace(appRegex.blog, '')
  return useQuery(['get-views', slug], fetchPostViews)
}
