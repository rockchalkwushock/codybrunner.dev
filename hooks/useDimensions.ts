import * as React from 'react'

type UseDimensions = (ref: React.RefObject<HTMLElement>) => {
  height: number
  width: number
}

export const useDimensions: UseDimensions = ref => {
  const dimensions = React.useRef({ height: 0, width: 0 })

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    dimensions.current.height = ref.current.offsetHeight
    dimensions.current.width = ref.current.offsetWidth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return dimensions.current
}
