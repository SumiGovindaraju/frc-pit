module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js'
  ],
  swFilePath: './build/service-worker.js',
  templateFilePath: './service-worker.tmpl',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
}