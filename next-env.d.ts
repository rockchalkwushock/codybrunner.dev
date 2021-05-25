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
    NEXT_PUBLIC_VERCEL_ENV: 'development' | 'preview' | 'production'
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME: string
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE: string
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: string
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string
    NEXT_PUBLIC_VERCEL_GIT_PROVIDER: string
    NEXT_PUBLIC_VERCEL_GIT_REPO_ID: string
    NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: string
    NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string
    NEXT_PUBLIC_VERCEL_REGION: string
    NEXT_PUBLIC_VERCEL_URL: string
    // Custom Environment Variables
    AMPLITUDE_API_KEY: string
    GITHUB_TOKEN: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    SPOTIFY_REFRESH_TOKEN: string
  }
}
