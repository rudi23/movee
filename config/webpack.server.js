const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CommonOptions = require('./common.js');
const WebpackNodeExternals = require('webpack-node-externals');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    server: './src/server.js',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, '..', 'dist', 'server'),
    filename: '[name].js',
  },
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      CommonOptions.CSSLoaderRule(),
    ],
  },
  externals: nodeModules,
  plugins: [
    CommonOptions.CleanupPlugin,
    new webpack.DefinePlugin({
      BROWSER_EXECUTION: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    CommonOptions.ExtractCSSPlugin,
    WebpackNodeExternals,
  ],
};
