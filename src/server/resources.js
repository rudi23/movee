import fs from 'fs';
import path from 'path';

const clientPath = path.join('dist', 'client');

const getResources = () => {
  const initResources = { css: [], js: [] };
  const webpackPath = path.resolve(path.join(clientPath, 'stats.json'));
  const data = fs.readFileSync(webpackPath, 'utf8');

  if (data) {
    const { assetsByChunkName } = JSON.parse(data);

    return Object.values(assetsByChunkName).reduce((resources, chunk) => ({
      css: resources.css.concat(chunk.filter(filename => /.css$/.test(filename))),
      js: resources.js.concat(chunk.filter(filename => /.js$/.test(filename))),
    }), initResources);
  }

  return initResources;
};

export default getResources;
