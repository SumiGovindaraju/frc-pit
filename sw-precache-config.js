module.exports = {
  staticFileGlobs: [
    'build/js/**.js',
    'build/static/css/**.**',
    'build/static/js/**.**',
    'build/static/media/**.**',
    'build/**.**'
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }],
  maximumFileSizeToCacheInBytes: 3500000,
  ignoreUrlParametersMatching: [/^team/, /^event/, /^redirect/]
}