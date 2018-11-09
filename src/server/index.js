import express from 'express';
import cookieParser from 'cookie-parser';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import routes from '../routes';
import classifyBrowser from './plugins/classifyBrowser';
import renderer from './renderer';
import createStore from './createStore';

export const start = () => {
  const logger = console;
  const app = express();
  const publicPath = 'dist/client';

  app.use(cookieParser());
  app.use(express.static(publicPath));
  app.use(classifyBrowser);

  app.use(
    '/api',
    proxy('http://react-ssr-api.herokuapp.com', {
      proxyReqOptDecorator(opts) {
        // eslint-disable-next-line no-param-reassign
        opts.headers['x-forwarded-host'] = 'localhost:3000';

        return opts;
      },
    })
  );

  app.get('*', (req, res) => {
    logger.info(`Request: ${req.path}`);

    const store = createStore(req);

    const promises = matchRoutes(routes, req.path)
      .map(({ route, match }) =>
        // eslint-disable-line arrow-body-style
        route.loadData && typeof route.loadData === 'function' ? route.loadData(store, match.params) : null
      )
      .map(promise => {
        if (promise instanceof Promise) {
          return new Promise(resolve => {
            promise.then(resolve).catch(resolve);
          });
        }
        return promise;
      });

    Promise.all(promises).then(() => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.action === 'REPLACE' && context.url) {
        return res.redirect(301, context.url);
      }

      res.status(context.notFound ? 404 : 200);
      res.set({
        Connection: 'Transfer-Encoding',
        'Content-Type': 'text/html; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
        'Timing-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      });

      return res.send(content);
    });
  });

  return app.listen(3000, () => {
    logger.info('Start listening on port 3000');
  });
};
