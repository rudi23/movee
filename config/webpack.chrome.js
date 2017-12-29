const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CommonOptions = require('./common.js');

const BROWSER_NAME = 'chrome';
const BROWSER_MIN_SUPPORTED_VERSION = 52;

const CopyPlugin = new CopyWebpackPlugin([
  {
    from: 'public',
    to: '../..',
    ignore: ['bundle.js'],
  },
], {
  copyUnmodified: true,
});

const OfflinePluginInstance = new OfflinePlugin({
  cacheMaps: [{
    match: requestUrl => new URL('/shell', location),
    requestTypes: ['navigate'],
  }],
  caches: 'all',
  externals: ['/shell'],
  excludes: ['**/.*', '**/*.map', '**/*.js.br', '**/*.js.gzip', '**/*.css', '**/*.css.br', '**/*.css.gzip'],
  autoUpdate: false,
  AppCache: false,
  ServiceWorker: {
    publicPath: '/bundle/chromesw.js',
  },
});

module.exports = {
  entry: CommonOptions.EntryPoints,
  output: CommonOptions.Output(BROWSER_NAME),
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      CommonOptions.CSSLoaderRule(`${BROWSER_NAME} ${BROWSER_MIN_SUPPORTED_VERSION}`),
    ],
  },
  plugins: [
    CommonOptions.CleanupPlugin,
    CommonOptions.DefineConstants({ ALLOW_OFFLINE: true }),
    CopyPlugin,
    CommonOptions.BabiliMinification,
    CommonOptions.ExtractCSSPlugin,
    OfflinePluginInstance,
    CommonOptions.BrotliCompression,
  ],
};
