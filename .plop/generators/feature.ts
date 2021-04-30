import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

import { format } from 'date-fns'
import { PlopGenerator } from 'plop'

const root = process.cwd()

const API_PATH = join(root, 'pages', 'api')
const BLOG_PATH = join(root, 'data', 'blog')
const COMPONENTS_PATH = join(root, 'components')
const HOOKS_PATH = join(root, 'hooks')
const INTERFACES_PATH = join(root, 'interfaces')
const LAYOUTS_PATH = join(root, 'layouts')
const LIB_PATH = join(root, 'lib')
const PAGES_PATH = join(root, 'pages')

const now = new Date()
const year = format(now, 'y')

export const feature: Pick<
  PlopGenerator,
  'actions' | 'description' | 'prompts'
> = {
  actions: answers => {
    const _actions = []
    if (answers.requirements.includes('api')) {
      _actions.push({
        path: `${API_PATH}/{{ pathCase endpointPath }}/{{ dashCase endpointName }}.ts`,
        templateFile: '.plop/templates/api.ts.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('component')) {
      _actions.push({
        path: `${COMPONENTS_PATH}/{{ properCase componentName }}.tsx`,
        templateFile: '.plop/templates/component.tsx.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('hook')) {
      _actions.push({
        path: `${HOOKS_PATH}/{{ camelCase hookName }}.ts`,
        templateFile: '.plop/templates/hook.ts.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('interface')) {
      _actions.push({
        path: `${INTERFACES_PATH}/{{ camelCase interfaceName }}.ts`,
        templateFile: '.plop/templates/interface.ts.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('layout')) {
      _actions.push({
        path: `${LAYOUTS_PATH}/{{ properCase layoutName }}.tsx`,
        templateFile: '.plop/templates/layout.tsx.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('lib')) {
      _actions.push({
        path: `${LIB_PATH}/{{ camelCase serviceName }}.ts`,
        templateFile: '.plop/templates/service.ts.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('page')) {
      _actions.push({
        path: `${PAGES_PATH}/{{ pathCase pagePath }}/{{ lowerCase pageName }}.tsx`,
        templateFile: '.plop/templates/page.tsx.hbs',
        type: 'add',
      })
    }
    if (answers.requirements.includes('post')) {
      if (!existsSync(join(BLOG_PATH, year))) {
        mkdirSync(join(BLOG_PATH, year))
      }
      // Create the new post with the current date.
      // i.e. 01/01/2021
      answers.createdAt = format(now, 'P')
      _actions.push({
        path: `${BLOG_PATH}/${year}/{{ dashCase postTitle }}.mdx`,
        templateFile: '.plop/templates/post.mdx.hbs',
        type: 'add',
      })
    }
    return _actions
  },
  description: 'Create a new feature.',
  prompts: [
    {
      choices: [
        { name: 'API Endpoint', value: 'api' },
        { name: 'Component', value: 'component' },
        { name: 'Hook', value: 'hook' },
        { name: 'Layout', value: 'layout' },
        { name: 'New Post', value: 'post' },
        { name: 'Page', value: 'page' },
        { name: 'Service', value: 'lib' },
        { name: 'Typings', value: 'interface' },
      ],
      message: 'What will this feature require?',
      name: 'requirements',
      type: 'checkbox',
    },
    // If 'requirement.api':
    {
      message: 'What should the api endpoint be named?',
      name: 'endpointName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('api')
      },
    },
    {
      message:
        'What should the path to the endpoint be? (no need to include /api/)',
      name: 'endpointPath',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('api')
      },
    },
    // If 'requirement.blog':
    {
      message: 'What is the title of the post?',
      name: 'postTitle',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('post')
      },
    },
    {
      message: 'What is the description of the post?',
      name: 'postDescription',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('post')
      },
    },
    {
      message: 'What are the keywords associated with the post?',
      name: 'postKeywords',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('post')
      },
    },
    {
      message: 'What are the tags associated with the post?',
      name: 'postTags',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('post')
      },
    },
    // If 'requirement.component':
    {
      message: 'What should the component be named?',
      name: 'componentName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('component')
      },
    },
    // If 'requirement.hook':
    {
      message: 'What should the hook be named?',
      name: 'hookName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('hook')
      },
    },
    // If 'requirement.interface':
    // Default should be the 'endpointName'.
    {
      default: ({ endpointName }) => {
        return endpointName
      },
      message: 'What should the interface be named?',
      name: 'interfaceName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('interface')
      },
    },
    // If 'requirement.layout':
    {
      message: 'What should the layout be named?',
      name: 'layoutName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('layout')
      },
    },
    // If 'requirement.lib':
    // Default should be the 'endpointName'.
    {
      default: ({ endpointName }) => {
        return endpointName
      },
      message: 'What should the service be named?',
      name: 'serviceName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('lib')
      },
    },
    // If 'requirement.page':
    {
      message: 'What should the page be named?',
      name: 'pageName',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('page')
      },
    },
    {
      message: 'What is the path to the page? (i.e. pages/hello/world/)',
      name: 'pagePath',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('page')
      },
    },
    {
      message: 'What is the description for the <meta />?',
      name: 'pageDescription',
      type: 'input',
      when: ({ requirements }) => {
        return requirements.includes('page')
      },
    },
    {
      choices: ['article', 'website'],
      message: 'What type of page is this?',
      name: 'pageType',
      type: 'list',
      when: ({ requirements }) => {
        return requirements.includes('page')
      },
    },
  ],
}
