const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://codybrunner.dev'
    : 'localhost:4000'

module.exports = {
  changefreq: 'monthly',
  exclude: ['/server-sitemap.xml'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${baseUrl}/server-sitemap.xml`],
    policies: [
      {
        allow: '/',
        userAgent: '*',
      },
    ],
  },
  siteUrl: baseUrl,
}
