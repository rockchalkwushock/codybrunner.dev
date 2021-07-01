import * as React from 'react'
import { Code } from 'react-feather'

import { Project } from '@utils/constants'

interface Props extends Project {}

export const ProjectCard: React.FC<Props> = ({
  description,
  name,
  source,
  url,
}) => {
  return (
    <div className="bg-accent-purple border border-accent-purple flex flex-col p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a
            aria-label={`Link to ${name}`}
            href={url || source}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className="font-semibold text-accent-yellow text-lg uppercase hover:underline">
              {name}
            </h2>
          </a>
        </div>

        <div>
          {source && (
            <a
              aria-label="Link to source code"
              href={source}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Code className="h-5 w-5 text-accent-yellow" />
            </a>
          )}
        </div>
      </div>
      <p className="text-gray-medium">{description}</p>
    </div>
  )
}
