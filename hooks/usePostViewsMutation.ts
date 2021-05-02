// import * as React from 'react'
import { useRouter } from 'next/router'
import {
  QueryFunctionContext,
  useMutation,
  UseMutationResult,
} from 'react-query'

import { updatePostViews } from '@lib/supabaseClient'
import { appRegex } from '@utils/constants'

type UsePostViewsMutation = () => UseMutationResult<
  unknown,
  unknown,
  QueryFunctionContext,
  unknown
>

export const usePostViewsMutation: UsePostViewsMutation = () => {
  const { asPath } = useRouter()
  const slug = asPath.replace(appRegex.blog, '')
  return useMutation(['post-views', slug], updatePostViews)
}
