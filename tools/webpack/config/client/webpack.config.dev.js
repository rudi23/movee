const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { getClientStylesRules } = require('../../rules/styles');
const { getFontsRules, getIconRules, getImagesRules } = require('../../rules/files');
const baseClientConfig = require('./webpack.config.common');

const isProduction = false;

module.exports = ({ outputPath }) => {
  const config = {
    mode: 'development',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      strictModuleExceptionHandling: true,
    },
    optimization: {
      noEmitOnErrors: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        ...getClientStylesRules({ isProduction }),
        ...getFontsRules({ isProduction }),
        ...getIconRules({ isProduction }),
        ...getImagesRules({ isProduction }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
        'process.env': {
          LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL),
        },
      }),
      new ExtractCssChunks({
        filename: '[name].css',
        chunkFilename: '[name].css',
        orderWarning: true,
        reloadAll: true,
        cssModules: true,
      }),
      // Needs to be last so the statistics are accurate.
      new StatsWriterPlugin({
        filename: 'stats.json',
        fields: null,
      }),
    ],
  };

  return merge(baseClientConfig({ outputPath }), config);
};
