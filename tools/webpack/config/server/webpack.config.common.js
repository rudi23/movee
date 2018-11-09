const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { getJsRules } = require('../../rules/javascript');
const babelConfig = require('./babel.config');

module.exports = ({ outputPath }) => ({
  name: 'server',
  entry: ['isomorphic-fetch', './src/server/index.js'],
  target: 'node',
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'app.js',
    library: '',
    libraryTarget: 'commonjs',
  },
  stats: 'verbose',
  devtool: 'eval-source-map',
  node: {
    __dirname: false, // Regular Node.js __dirname behavior. (used when reading files from built source)
  },
  // Skip bundling node_modules, expect ones required by `react-router`, `react-router-dom` and `history` to work properly
  externals: [
    nodeExternals({
      whitelist: [
        /webpack-flush-chunks|history|\.(?!(?:jsx?|json)$)/, // whitelist all non js/jsx/json files so we can use eg. css from libraries
      ],
    }),
  ],
  module: {
    rules: [...getJsRules(babelConfig)],
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEB__: JSON.stringify(false),
      __SERVER__: JSON.stringify(true),
    }),
    // We don't want chunks on the server, so ensure they all end up in the same
    // bundle. This is also required for `universal-component` to work properly.
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
