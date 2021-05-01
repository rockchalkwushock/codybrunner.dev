// https://developers.amplitude.com/docs/how-amplitude-works
import { isServer } from '@utils/helpers'

/**
 * @name initAmplitudeJS
 * @description Initializes the amplitude-js library
 * @returns {void}
 */
export function initAmplitudeJS(): void {
  if (isServer) {
    return
  } else if (process.env.NODE_ENV === 'production') {
    console.log(`
    AMPLITUDE_API_KEY: ${process.env.AMPLITUDE_API_KEY}
    NODE_ENV: ${process.env.NODE_ENV}
    VERCEL_URL: ${process.env.NEXT_PUBLIC_VERCEL_URL}
    `)
    // Initialize AmplitudeJS with the unique hash for this browser.
    require('amplitude-js').getInstance().init(process.env.AMPLITUDE_API_KEY)
    require('amplitude-js')
      .getInstance()
      .setDomain(process.env.NEXT_PUBLIC_VERCEL_URL)
  } else {
    return
  }
}

/**
 * @name trackEvent
 * @param eventName {string} - custom name of event
 * @param attributes {Record<string, unknown>} - additional data
 * @description Send event data to AmplitudeJS.
 * @returns {Promise<boolean>}
 */
export function trackEvent(
  eventName: string,
  attributes?: Record<string, unknown>
): Promise<boolean> {
  if (isServer) {
    return new Promise(resolve => resolve(true))
  }
  return new Promise(resolve => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Amplitude', eventName, attributes)
    }
    require('amplitude-js')
      .getInstance()
      .logEvent(eventName, attributes, () => resolve(true))
  })
}
