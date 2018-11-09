const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const getLocalIdentName = isProduction => (isProduction ? '[hash:base64:5]' : '[path][name]__[local]__[hash:base64:5]');

const getClientStylesRules = ({ isProduction }) => [
  {
    test: /\.css$/,
    use: [
      ExtractCssChunks.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          modules: false, // We don't want to use css-modules for css not written by us
          minimize: false,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      ExtractCssChunks.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          modules: true,
          localIdentName: getLocalIdentName(isProduction),
          minimize: false,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          ident: 'postcss',
          plugins: [
            autoprefixer({
              remove: false,
            }),
            cssnano({
              zindex: false, // Disable the z-index optimisations ref: https://cssnano.co/optimisations/zindex
            }),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
];

const getServerStylesRules = ({ isProduction }) => [
  {
    test: /\.css$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          modules: false,
          importLoaders: 0,
          minimize: false,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: getLocalIdentName(isProduction),
          minimize: false,
        },
      },
    ],
  },
];

module.exports = {
  getServerStylesRules,
  getClientStylesRules,
};
