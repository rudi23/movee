const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const CSS_LOADER_OPTIONS = {
  minimize: true,
  camelCase: false,
  importLoaders: 1,
};

const POSTCSS_LOADER_OPTIONS = (browsers = ['last 3 versions']) => ({
  plugins: () => ([
    autoprefixer({
      browsers,
    }),
  ]),
});

const ExtractCSSPlugin = new ExtractTextPlugin({
  filename: 'bundle.css',
  allChunks: true,
  // This is not ideal. However, Extract-Text doesn't support extracting the per bundle css.
});

const BabiliMinification = new BabiliPlugin();

const BrotliCompression = new BrotliPlugin({
  asset: '[path].br[query]',
  test: /\.(js|css)$/,
  mode: 0,
  quality: 11,
});

const CleanupPlugin = new WebpackCleanupPlugin({
  exclude: ['webpack.json', '.gitignore', '.gitkeep'],
  quiet: true,
});

const EntryPoints = {
  application: './src/client.js',
};

const Output = browserName => ({
  filename: 'bundle.js',
  path: path.resolve(__dirname, '..', 'dist', 'client', 'bundle', browserName),
  publicPath: '/dist/client/',
  chunkFilename: 'bundle.js',
});

const DefineConstants = ({
  POLYFILL_OBJECT_ASSIGN = false,
  POLYFILL_OBJECT_VALUES = false,
  POLYFILL_PROMISES = false,
  POLYFILL_FETCH = false,
  POLYFILL_URL = false,
  ALLOW_OFFLINE = false,
  BROWSER_EXECUTION = true,
  NODE_ENV = process.env.NODE_ENV || 'development',
} = {}) => (new webpack.DefinePlugin({
  POLYFILL_OBJECT_ASSIGN,
  POLYFILL_OBJECT_VALUES,
  POLYFILL_PROMISES,
  POLYFILL_FETCH,
  POLYFILL_URL,
  ALLOW_OFFLINE,
  BROWSER_EXECUTION,
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
  },
}));

const WebpackStats = {
  assets: true,
  cached: false,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  colors: true,
  errors: true,
  errorDetails: true,
  hash: false,
  modules: false,
  publicPath: true,
  reasons: false,
  source: false,
  timings: false,
  version: false,
  warnings: false,
};

const BabelLoaderRule = {
  test: /\.js?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
};

const CSSLoaderRule = browsers => ({
  test: /\.css$/,
  include: /node_modules/,
  use: ExtractCSSPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: CSS_LOADER_OPTIONS },
      { loader: 'postcss-loader', options: POSTCSS_LOADER_OPTIONS(browsers) },
    ],
  }),
});

module.exports = {
  CSS_LOADER_OPTIONS,
  ExtractCSSPlugin,
  EntryPoints,
  Output,
  DefineConstants,
  WebpackStats,
  BabelLoaderRule,
  CSSLoaderRule,
  BabiliMinification,
  BrotliCompression,
  CleanupPlugin,
};

