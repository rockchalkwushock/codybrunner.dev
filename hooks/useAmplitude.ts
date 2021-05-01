import * as React from 'react'
import { useRouter } from 'next/router'

import { trackEvent } from '@lib/amplitude'

type UseAmplitude = (
  skipPageTracking?: boolean
) => {
  setEvent: (
    eventName: string,
    attributes?: Record<string, unknown> | undefined
  ) => void
}

export const useAmplitude: UseAmplitude = skipPageTracking => {
  // Get reference to router.
  const router = useRouter()

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    // Opt-out of page tracking.
    if (skipPageTracking) {
      return
    }

    const handleRouteChange = (url: string) => {
      trackEvent('pageVisit', { page: url })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, skipPageTracking])

  // This handler is all the hook will emit.
  // Its purpose is for user action related tracking.
  const setEvent = React.useCallback(
    (eventName: string, attributes?: Record<string, unknown>) => {
      trackEvent(eventName, attributes)
    },
    []
  )

  return { setEvent }
}
