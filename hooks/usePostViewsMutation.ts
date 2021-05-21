import {
  QueryFunctionContext,
  useMutation,
  UseMutationResult,
} from 'react-query'

import { updatePostViews } from '@lib/supabaseClient'

type UsePostViewsMutation = (
  slug: string
) => Pick<
  UseMutationResult<
    void,
    unknown,
    QueryFunctionContext<['update-post-views', string], unknown>,
    unknown
  >,
  'isSuccess' | 'mutate'
>

export const usePostViewsMutation: UsePostViewsMutation = slug => {
  const { isSuccess, mutate } = useMutation(
    ['update-post-views', slug],
    updatePostViews
  )
  return { isSuccess, mutate }
}
