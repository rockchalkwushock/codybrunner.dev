import * as React from 'react'

import { useGetPostViews } from '@hooks/useGetPostViews'
import { usePostViewsMutation } from '@hooks/usePostViewsMutation'

interface Props {
  slug: string
}

export const PostViews: React.FC<Props> = ({ slug }) => {
  const { mutate } = usePostViewsMutation(slug)
  const { data, status } = useGetPostViews()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => mutate({ queryKey: ['update-post-views', slug] }), [])

  return status === 'error' ? null : (
    <span>
      {status === 'loading' && 'Loading...'}
      {status === 'success' &&
        `${data} ${(data as number) > 1 ? 'views' : 'view'}`}
    </span>
  )
}
