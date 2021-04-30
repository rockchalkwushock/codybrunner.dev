import * as React from 'react'

type CopyStatus = 'inactive' | 'copied' | 'failed'

type UseCopyToClipboard = (
  text: string,
  notifyTimeout?: number
) => [status: CopyStatus, copy: () => void]

export const useCopyToClipboard: UseCopyToClipboard = (
  text,
  notifyTimeout = 2500
) => {
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>('inactive')

  const copy = React.useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed')
    )
  }, [text])

  React.useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyStatus])
  return [copyStatus, copy]
}
