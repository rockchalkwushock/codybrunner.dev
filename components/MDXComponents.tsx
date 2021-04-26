import * as React from 'react'

export const Grid: React.FC = ({ children }) => {
  return (
    <div className="bg-secondary gap-4 grid grid-cols-3 justify-items-center p-4 place-items-center rounded-lg md:grid-cols-5">
      {children}
    </div>
  )
}

export const Signature: React.FC = ({ children }) => {
  return (
    <div className="flex font-semibold items-center justify-center text-xl w-full">
      {children}
    </div>
  )
}

export const TLDR: React.FC = ({ children }) => {
  return (
    <div className="border flex flex-col p-4 rounded-lg shadow-md space-y-2">
      <h6 className="font-bold text-2xl">TLDR 🤏🏻</h6>
      <p className="font-light italic m-0 tracking-wide">{children}</p>
    </div>
  )
}
