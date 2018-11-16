module.exports = {
  staticFileGlobs: [
    'build/js/**.js',
    'build/static/css/**.**',
    'build/static/js/**.**',
    'build/static/media/**.**',
    'build/**.html'
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  importScripts: (['./js/service-worker.js']),
  handleFetch: false
}