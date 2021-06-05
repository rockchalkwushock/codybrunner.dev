import * as React from 'react'

import { AnimatedPage, PageMetaData } from '@components/AnimatedPage'
import { Panel, ProjectKey, Tab, Tabs } from '@components/Tabs'
import { ProjectCard } from '@components/ProjectCard'
import { projects } from '@utils/constants'

const Projects: React.FC = () => {
  const pageMetaData: PageMetaData = {
    description: 'Enterprise & Side Projects Cody Brunner has developed.',
    title: 'codybrunner.dev | Projects',
    type: 'website',
  }

  return (
    <AnimatedPage pageMetaData={pageMetaData}>
      <Tabs>
        <div className="flex flex-col space-y-6">
          <div className="flex overflow-x-scroll space-x-2 md:space-x-4">
            {Object.keys(projects).map(key => (
              <Tab key={`${key}--Tab`} projectKey={key as ProjectKey}>
                <button className="bg-accent border border-transparent px-4 py-2 rounded-full text-accent-secondary uppercase">
                  {key}
                </button>
              </Tab>
            ))}
          </div>
          {/* TODO: In the future I would like to animated the <Panel/> entry and exit. */}
          {Object.keys(projects).map(key => (
            <Panel key={`${key}--Panel`} projectKey={key as ProjectKey}>
              {projects[key as ProjectKey].map(project => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </Panel>
          ))}
        </div>
      </Tabs>
    </AnimatedPage>
  )
}

export default Projects
