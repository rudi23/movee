const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { getClientStylesRules } = require('../../rules/styles');
const { getFontsRules, getIconRules, getImagesRules } = require('../../rules/files');
const baseClientConfig = require('./webpack.config.common');

const isProduction = true;

module.exports = ({ outputPath }) => {
  const config = {
    mode: 'production',
    output: {
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
    },
    devtool: 'nosources-source-map',
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
        __DEV__: JSON.stringify(false),
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // Not needed for strategy to work (just good practice)
      new webpack.HashedModuleIdsPlugin(),
      new ExtractCssChunks({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[name].[chunkhash:8].css',
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
