import * as React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { AnimatedPage } from '@components/AnimatedPage'
import { Panel, ProjectKey, Tab, Tabs } from '@components/Tabs'
import { ProjectCard } from '@components/ProjectCard'
import { constants, projects } from '@utils/constants'

const Projects: React.FC = () => {
  const { asPath } = useRouter()

  return (
    <AnimatedPage>
      <NextSeo
        canonical={`${constants.url}${asPath}`}
        description="Enterprise & Side Projects Cody Brunner has developed."
        openGraph={{
          description: 'Enterprise & Side Projects Cody Brunner has developed.',
          url: `${constants.url}${asPath}`,
        }}
        title="Projects"
      />
      <Tabs>
        <div className="flex flex-col space-y-6">
          <div className="flex overflow-x-scroll space-x-2 md:space-x-4">
            {Object.keys(projects).map(key => (
              <Tab key={`${key}--Tab`} projectKey={key as ProjectKey}>
                <button className="border border-transparent px-4 py-2 rounded-full uppercase">
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
