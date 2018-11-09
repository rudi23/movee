const webpack = require('webpack');
const merge = require('webpack-merge');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { getServerStylesRules } = require('../../rules/styles');
const { getFontsRules, getIconRules, getImagesRules } = require('../../rules/files');
const baseServerConfig = require('./webpack.config.common');

const isProduction = true;

module.exports = ({ outputPath }) => {
  const config = {
    mode: 'production',
    devtool: 'nosources-source-map',
    module: {
      rules: [
        ...getServerStylesRules({ isProduction }),
        ...getFontsRules({ isProduction }),
        ...getIconRules({ isProduction }),
        ...getImagesRules({ isProduction }),
      ],
    },
    optimization: {
      minimize: false, // Better stack traces and more
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      // Needs to be last so the statistics are accurate.
      new StatsWriterPlugin({
        filename: 'stats.json',
        fields: null,
      }),
    ],
  };

  return merge(baseServerConfig({ outputPath }), config);
};
