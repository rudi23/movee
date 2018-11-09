const webpack = require('webpack');
const ReFaviconsWebpackPlugin = require('refavicons-webpack-plugin');
const { getJsRules } = require('../../rules/javascript');
const babelConfig = require('./babel.config');

const isClient = true;

module.exports = ({ outputPath }) => ({
  entry: {
    app: ['./src/client/index.js'],
  },
  module: {
    rules: [
      ...getJsRules(babelConfig, isClient),
    ],
  },
  name: 'client',
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 1,
        },
      },
    },
  },
  output: {
    path: outputPath,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEB__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false),
    }),
    new ReFaviconsWebpackPlugin({
      appName: 'movee',
      logo: './public/logo.png',
      inject: false,
      emitStats: true,
      persistentCache: false,
      prefix: 'favicon/',
      statsFilename: 'faviconstats.json',
      appleStatusBarStyle: 'black',
      background: '#fff',
    }),
  ],
  stats: 'verbose',
  target: 'web',
});
