import * as React from 'react'
import { Archive, Code } from 'react-feather'

import { Project } from '@utils/constants'

interface Props extends Project {}

export const ProjectCard: React.FC<Props> = ({
  description,
  isArchived,
  name,
  source,
  url,
}) => {
  return (
    <div className="bg-brand border border-brand flex flex-col p-4 rounded-lg shadow-md text-gray-dark">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a
            aria-label={`Link to ${name}`}
            href={url || source}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className="font-semibold text-lg uppercase hover:underline">
              {name}
            </h2>
          </a>
          {isArchived && (
            <Archive
              aria-label="Archived"
              className="h-5 w-5 text-accent-red"
            />
          )}
        </div>

        <div>
          {source && (
            <a
              aria-label="Link to source code"
              href={source}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Code className="h-5 w-5 text-accent-blue" />
            </a>
          )}
        </div>
      </div>
      <p>{description}</p>
    </div>
  )
}
