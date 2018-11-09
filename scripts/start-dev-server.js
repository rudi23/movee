#!/usr/bin/env node

const path = require('path');
const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const webpack = require('webpack');
const chalk = require('chalk');
const requireFromString = require('require-from-string');
const createWebpackConfigs = require('../tools/webpack/createConfigs');

// https://webpack.js.org/api/node
const log = console;
const { clientConfig, serverConfig } = createWebpackConfigs();
const compiler = webpack([clientConfig, serverConfig]);

compiler.run(async (err, stats) => {
  if (err || stats.hasErrors()) {
    log.info(chalk.red(stats.toString()));
    log.error(err, 'Compilation error');

    return;
  }

  const appPath = path.join(serverConfig.output.path, '..');
  const bundlePath = path.resolve(serverConfig.output.path, serverConfig.output.filename);

  // eslint-disable-next-line import/no-dynamic-require
  const bundle = require(bundlePath);
  const server = new Koa();
  const middleware = await koaWebpack({
    compiler,
    devMiddleware: {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
    },
    hotClient: {
      port: 8088, // The default 8081 is sometimes taken (I'm looking at you McAfee…)
      reload: false,
    },
  });
  server.use(middleware);

  let _server;
  let previousServerHash;

  compiler.hooks.done.tap({ name: 'restartServer' }, multiStats => {
    const { hash } = multiStats.stats[1]; // server stats
    if (previousServerHash && hash !== previousServerHash) {
      try {
        const fs = compiler.compilers[1].outputFileSystem; // server compiler fs
        const contents = fs.readFileSync(bundlePath, 'utf8');
        const app = requireFromString(contents, serverConfig.output.filename);

        log.info(chalk.yellow('Restarting server'));
        _server.close();
        const restartedServer = new Koa();
        restartedServer.use(middleware);
        _server = app.start(restartedServer, appPath);
        log.info(chalk.green('Done!'));
      } catch (e) {
        log.error(e, 'Failed to restart server');
      }
    }
    previousServerHash = hash;
  });

  log.info('Starting server with %s', chalk.yellow('hot reloading'));
  _server = bundle.start(server, appPath);
});
