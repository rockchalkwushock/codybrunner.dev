import { constants } from './utils/constants'

const config = {
  // additionalLinkTags: [
  //   {
  //     href: '',
  //     rel: '',
  //     type: '',
  //   },
  // ],
  additionalMetaTags: [
    {
      content: 'width=device-width, initial-scale=1',
      name: 'viewport',
    },
    {
      content: constants.author,
      name: 'author',
    },
  ],
  canonical: constants.url,
  description: constants.description,
  // defaultOpenGraphImageHeight: 0,
  // defaultOpenGraphImageWidth: 0,
  nofollow: false,
  noindex: false,
  openGraph: {
    // defaultImageHeight: 0,
    // defaultImageWidth: 0,
    // images: [
    //   {
    //     alt: '',
    //     height: 0,
    //     url: '',
    //     width: 0,
    //   },
    // ],
    locale: constants.lang,
    site_name: constants.author,
    type: 'website',
    url: constants.url,
  },
  robotsProps: {
    maxSnippet: 180,
    noarchive: true,
    noimageindex: true,
    nosnippet: false,
    notranslate: false,
  },
  title: 'Home',
  titleTemplate: 'codybrunner.dev | %s',
  twitter: {
    cardType: 'summary_large_image',
    handle: constants.twitter,
    site: constants.twitter,
  },
}

export default config
