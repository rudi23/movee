/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');

const log = console;
const isProduction = process.env.NODE_ENV === 'production';

const createConfig = ({ target = 'client' }) => {
  if (!/^(client|server)$/.test(target)) {
    throw new Error('Build target can be either client or server');
  }

  log.info('Building webpack config for %s', target);

  const outputPath = path.join(__dirname, '../../dist', target);

  return isProduction
    ? require(`./config/${target}/webpack.config.production`)({ outputPath })
    : require(`./config/${target}/webpack.config.dev`)({ outputPath });
};

module.exports = () => ({
  clientConfig: createConfig({ target: 'client' }),
  serverConfig: createConfig({ target: 'server' }),
});
