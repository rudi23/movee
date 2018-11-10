import { matchRoutes } from 'react-router-config';
import logger from '../../../logger';
import routes from '../../../routes';
import renderer from './renderer';
import createStore from './createStore';

const index = () => async (ctx, next) => {
  await next();

  if (!ctx.body) {
    logger.info(`Request: ${ctx.request.path}`);

    const store = createStore(ctx);

    const promises = matchRoutes(routes, ctx.request.path)
      .map(({ route, match }) =>
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

    await Promise.all(promises);

    const context = {};
    const content = renderer(ctx.request, store, context);

    if (context.action === 'REPLACE' && context.url) {
      ctx.redirect(301, context.url);

      return;
    }

    // todo-krudowski handle 5xx errros

    ctx.status = context.notFound ? 404 : 200;

    // todo-krudowski move headers

    ctx.set({
      Connection: 'Transfer-Encoding',
      'Content-Type': 'text/html; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
      'Timing-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });

    ctx.body = content;
  }
};

export default index;
