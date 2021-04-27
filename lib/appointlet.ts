import { isServer } from '@utils/helpers'

export const appointlet = (el: HTMLElement): void => {
  if (isServer) {
    return
  }
  const Appointlet = require('@appointlet/appointlet.js').default

  const appointlet = new Appointlet('https://appt.link/cody-brunner-dev')
  appointlet.inlineEmbed(el)
}
