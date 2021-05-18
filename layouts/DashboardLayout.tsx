import * as React from 'react'

interface Props {}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="gap-y-6 grid grid-cols-1 lg:gap-4 lg:grid-cols-2">
      {children}
    </div>
  )
}
