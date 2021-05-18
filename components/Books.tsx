import * as React from 'react'

import { constants } from '@utils/constants'

export const Books: React.FC = () => {
  return (
    <div className="border border-transparent flex flex-col p-4 rounded-lg shadow-md">
      <header className="flex items-center justify-center mb-4 w-full">
        <h2 className="font-medium italic text-2xl">Currently Reading</h2>
      </header>
      <ol className="flex flex-col space-y-2">
        {constants.books.map(({ href, image, title }) => (
          <li className="p-4 rounded-lg shadow-md" key={href}>
            <a
              className="flex items-center justify-between"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt={title} className="h-20 w-18" src={image} />
              <h2 className="text-right md:text-xl">{title}</h2>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
