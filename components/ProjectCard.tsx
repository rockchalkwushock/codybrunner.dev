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
    <div className="project-card">
      <div>
        <div>
          <a
            aria-label={`Link to ${name}`}
            href={url || source}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>{name}</h2>
          </a>
          {isArchived && (
            <Archive
              aria-label="Archived"
              className="text-red-300 dark:text-red-500"
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
              <Code className="text-blue-300 dark:text-blue-500" />
            </a>
          )}
        </div>
      </div>
      <p>{description}</p>
    </div>
  )
}
