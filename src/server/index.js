import serveStatic from 'koa-static';
import mount from 'koa-mount';
import compress from 'koa-compress';
import userAgent from 'koa2-useragent';
import helmet from 'koa-helmet';
import logger from '../logger';
import serveApp from './middlewares/serveApp';
import authApi from './middlewares/authApi';

const PORT = 3000;

export const start = server => {
  server.use(helmet());
  server.use(compress());

  // todo-krudowski pass dist path
  server.use(serveStatic('dist/client', { maxage: 31536000000 }));
  server.use(userAgent());

  server.use(mount('/api', authApi()));
  server.use(serveApp());

  return server.listen(PORT, () => {
    logger.info(`Start listening on port ${PORT}`);
  });
};
