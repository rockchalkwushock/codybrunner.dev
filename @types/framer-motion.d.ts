/* eslint-disable @typescript-eslint/no-unused-vars */
import * as framer from 'framer-motion'

declare module 'framer-motion' {
  // These are not exported from the internal typings.
  export type Cycle = (i?: number) => void
  export type CycleState<T> = [T, Cycle]
}
