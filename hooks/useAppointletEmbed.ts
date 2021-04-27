import * as React from 'react'

// Import the associated styles for the Appointlet SDK.
import '@appointlet/appointlet.js/dist/appointlet.min.css'
import { appointlet } from '@lib/appointlet'

export const useAppointletEmbed = () => {
  const [mounted, setMounted] = React.useState(false)
  const [embed, setEmbed] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  React.useEffect(() => {
    const el = document.createElement('div')
    el.id = 'appointlet-inline-embed'
    const div = document.getElementById('appointlet-section')
    if (mounted && div && !embed) {
      div.appendChild(el)
      appointlet(el)
      setEmbed(true)
    }
  }, [embed, mounted])
}
