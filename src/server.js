import express from 'express';
import cookieParser from 'cookie-parser';
import { matchRoutes } from 'react-router-config';
import classifyBrowser from './server/plugins/classifyBrowser';
import setRequestResources from './server/plugins/setRequestResources';
import webpackResources from './server/resources';
import renderer from './server/renderer';
import createStore from './server/createStore';
import routes from './routes';

const logger = console;
const app = express();
const publicPath = process.env.NODE_ENV === 'development' ? 'public' : 'dist/client';

app.use(cookieParser());
app.use(express.static(publicPath));
app.use(classifyBrowser);
app.use(setRequestResources(webpackResources(logger)));

app.get('*', (req, res) => {
  logger.info(`Request: ${req.path}`);

  const store = createStore(req);

  // eslint-disable-next-line arrow-body-style
  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData && typeof route.loadData === 'function' ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.status(200);
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
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  logger.info('Start listening on port 3000');
});
