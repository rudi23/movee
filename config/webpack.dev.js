const path = require('path');
const CommonOptions = require('./common.js');

module.exports = {
  entry: CommonOptions.EntryPoints,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'public'),
  },
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      {
        test: /\.css$/,
        include: /node_modules/,
        use: CommonOptions.ExtractCSSPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
    ],
  },
  plugins: [
    CommonOptions.DefineConstants(),
    CommonOptions.ExtractCSSPlugin,
  ],
};
