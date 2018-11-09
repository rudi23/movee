#!/usr/bin/env node
const webpack = require('webpack');
const chalk = require('chalk');
const createWebpackConfigs = require('../tools/webpack/createConfigs');

const log = console;
const { clientConfig, serverConfig } = createWebpackConfigs();
const compiler = webpack([clientConfig, serverConfig]);

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    log.error(err, 'Compilation error: %s', stats.toString());

    return;
  }

  log.info('Compilation %s', chalk.green('done!'));
  log.info('Webpack stats', stats.toString());
});
