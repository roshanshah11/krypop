/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.krypop.com', // <-- Add www here for correct sitemap URLs
  generateRobotsTxt: true, // Automatically generate robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public', // Output to public/ for Vercel compatibility
  sitemapSize: 7000,
  exclude: [], // Add any paths to exclude from sitemap here
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    // No additionalSitemaps needed for single sitemap
  },
  // Ensure all static and dynamic routes are included
  transform: async (config, path) => {
    // Exclude Next.js special files
    if (path === '/_error' || path === '/404' || path === '/500') {
      return null;
    }
    // Optionally, exclude any custom paths here
    return {
      loc: path, // The url path
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
