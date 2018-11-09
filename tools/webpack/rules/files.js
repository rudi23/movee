const hashedName = '[name].[hash:8].[ext]';
const nonHashedName = '[name].[ext]';

const getFontsRules = ({ isProduction }) => [
  {
    test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    exclude: /node_modules/,
    query: {
      limit: 10000,
      mimetype: 'application/font-woff2',
      name: isProduction ? hashedName : nonHashedName,
    },
  },
  {
    test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    exclude: /node_modules/,
    query: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: isProduction ? hashedName : nonHashedName,
    },
  },
  {
    test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    exclude: /node_modules/,
    loader: 'file-loader',
    query: {
      name: isProduction ? hashedName : nonHashedName,
      publicPath: '/',
    },
  },
];

const getIconRules = ({ isProduction }) => [
  {
    test: /\.(svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    exclude: /node_modules/,
    loader: 'file-loader',
    query: {
      name: isProduction ? hashedName : nonHashedName,
      publicPath: '/',
    },
  },
];

const getImagesRules = ({ isProduction }) => [
  {
    test: /\.(png|gif|jpe?g|cur)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    query: {
      limit: 8192,
      name: isProduction ? '[name].[hash:8].[ext]' : '[name].[ext]',
    },
  },
];

module.exports = {
  getFontsRules,
  getIconRules,
  getImagesRules,
};
