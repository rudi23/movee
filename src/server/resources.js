import fs from 'fs';
import path from 'path';

const CLASSIFICATIONS = ['chrome', 'edge', 'safari', 'firefox', 'fallback'];

const loadResources = (logger) => {
  const returnedResources = {};

  if (process.env.NODE_ENV === 'development') {
    return {
      dev: {
        css: {
          inline: null,
          url: null,
        },
        js: '/bundle.js',
        'service.worker': null,
      },
    };
  }

  CLASSIFICATIONS.forEach((classification) => {
    const webpackPath = path.resolve('dist', 'client', 'bundle', classification, 'webpack.json');
    const data = fs.readFileSync(webpackPath, 'utf8');

    const { assetsByChunkName } = JSON.parse(data);
    const cssFilename = assetsByChunkName.application.filter(filename => /.css/.test(filename));
    const jsFilename = assetsByChunkName.application.filter(filename => /.js/.test(filename));

    if (cssFilename && cssFilename.length > 0 && jsFilename && jsFilename.length > 0) {
      const cssPath = path.resolve('dist', 'client', 'bundle', classification, cssFilename[0]);
      const data2 = fs.readFileSync(cssPath, 'utf8');

      returnedResources[classification] = {
        css: {
          inline: data2,
          url: `/bundle/${classification}/${cssFilename[0]}`,
        },
        js: `/bundle/${classification}/${jsFilename[0]}`,
        'service.worker': assetsByChunkName['service.worker'],
      };

      logger.info(`RESOURCES – Load – ${classification} success`);
    }
  });

  return returnedResources;
};

export default loadResources;
