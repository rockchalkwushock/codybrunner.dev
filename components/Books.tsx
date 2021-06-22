import * as React from 'react'

import { Image, externalURLLoader } from './Image'
import { constants } from '@utils/constants'

export const Books: React.FC = () => {
  return (
    <div className="flex flex-col p-2">
      <header className="flex items-center justify-center mb-4 w-full">
        <h2 className="font-medium italic text-accent text-2xl">
          Currently Reading
        </h2>
      </header>
      <ol className="flex flex-col space-y-2">
        {constants.books.map(({ href, image, title }) => (
          <li
            className="bg-accent p-4 rounded-lg shadow-md text-accent-secondary"
            key={href}
          >
            <a
              className="flex items-center justify-between"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt={title}
                className="h-20 w-16"
                height={100}
                loader={externalURLLoader}
                src={image}
                width={100}
              />
              <h2 className="text-right md:text-xl">{title}</h2>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
