const CommonOptions = require('./common.js');

const BROWSER_NAME = 'fallback';

module.exports = {
  entry: CommonOptions.EntryPoints,
  output: CommonOptions.Output(BROWSER_NAME),
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      CommonOptions.CSSLoaderRule(),
    ],
  },
  plugins: [
    CommonOptions.CleanupPlugin,
    CommonOptions.DefineConstants({
      POLYFILL_OBJECT_ASSIGN: true,
      POLYFILL_OBJECT_VALUES: true,
      POLYFILL_PROMISES: true,
      POLYFILL_FETCH: true,
      POLYFILL_URL: true,
    }),
    CommonOptions.BabiliMinification,
    CommonOptions.ExtractCSSPlugin,
  ],
};
