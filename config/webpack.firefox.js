const CommonOptions = require('./common.js');

const BROWSER_NAME = 'firefox';
const BROWSER_MIN_SUPPORTED_VERSION = 50;

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
    CommonOptions.DefineConstants({ POLYFILL_URL: true }),
    CommonOptions.BabiliMinification,
    CommonOptions.ExtractCSSPlugin,
    CommonOptions.BrotliCompression,
  ],
};
