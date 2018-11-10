import proxy from 'koa-better-http-proxy';

export default () =>
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator: proxyReqOpts => ({
      ...proxyReqOpts,
      headers: {
        ...proxyReqOpts.headers,
        'x-forwarded-host': 'localhost:3000',
      },
    }),
  });
