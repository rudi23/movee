const webpack = require('webpack');
const merge = require('webpack-merge');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { getServerStylesRules } = require('../../rules/styles');
const { getFontsRules, getIconRules, getImagesRules } = require('../../rules/files');
const baseClientConfig = require('./webpack.config.common');

const isProduction = false;

module.exports = ({ outputPath }) => {
  const config = {
    mode: 'development',
    devtool: 'sourcemap',
    module: {
      rules: [
        ...getServerStylesRules({ isProduction }),
        ...getFontsRules({ isProduction }),
        ...getIconRules({ isProduction }),
        ...getImagesRules({ isProduction }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
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
