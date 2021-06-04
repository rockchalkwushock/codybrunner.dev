// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  changefreq: 'weekly',
  generateRobotsTxt: true,
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://codybrunner.dev'
      : 'http://localhost:4000',
  transform: (config, url) => {
    // Parse out the post-styles-template
    if (url.includes('post-styles-template')) {
      return
    }
    if (url.includes('archive')) {
      return {
        loc: url,
        changefreq: 'never',
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
