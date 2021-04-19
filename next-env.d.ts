/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  // https://dev.to/isthatcentered/typing-process-env-and-dealing-with-nodeenv-3ilm
  export interface ProcessEnv {
    // Node Environment Variables
    NODE_ENV: 'development' | 'production' | 'test'
    // Vercel Environment Variables
    ANALYZE: boolean
    CI: string
    VERCEL: string
    VERCEL_ENV: 'development' | 'preview' | 'production'
    VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string
    VERCEL_GIT_COMMIT_AUTHOR_NAME: string
    VERCEL_GIT_COMMIT_MESSAGE: string
    VERCEL_GIT_COMMIT_REF: string
    VERCEL_GIT_COMMIT_SHA: string
    VERCEL_GIT_PROVIDER: string
    VERCEL_GIT_REPO_ID: string
    VERCEL_GIT_REPO_OWNER: string
    VERCEL_GIT_REPO_SLUG: string
    VERCEL_REGION: string
    VERCEL_URL: string
  }
}
