const path = require('path');

const getJsRules = (babelConfig, isClient) => {
  const config = {
    test: /\.(js|jsx)$/, // yml needed for running the generated config through babel
    use: {
      loader: 'babel-loader',
      options: {
        // Disable inheritance since we only want to use
        // the configuration we have defined here
        babelrc: false,
        ...babelConfig,
      },
    },
  };

  if (isClient) {
    config.include = [
      path.resolve(__dirname, '../../../src'),
    ];
  } else {
    config.exclude = /(node_modules)/;
  }

  return [config];
};

module.exports = {
  getJsRules,
};
