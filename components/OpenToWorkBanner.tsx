import * as React from 'react'
import { isAfter, isEqual } from 'date-fns'

export const OpenToWorkBanner: React.FC = () => {
  // Open to work starting April 1st 2021.
  const dateOpenToWork = new Date(2021, 3, 1)
  // Date to compare
  const date = new Date()
  // If it is April 1st 2021 or after then render this banner, if not don't.
  return isEqual(date, dateOpenToWork) || isAfter(date, dateOpenToWork) ? (
    <div className="bg-green-300 flex h-12 items-center justify-center p-4 w-screen">
      <h1 className="font-medium text-black text-lg lg:text-2xl">
        Currently open for new and exciting work!
      </h1>
    </div>
  ) : null
}
