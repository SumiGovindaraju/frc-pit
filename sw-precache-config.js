module.exports = {
  staticFileGlobs: [
    './build/index.html',
    './build/css/**.css',
    './build/js/**.js',
    './build/static/**.**',
    './build/webfonts/**.**'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: './build/service-worker.js',
  navigateFallback: './200.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  stripPrefix: './build'
}