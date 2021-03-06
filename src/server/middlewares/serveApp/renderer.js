import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { renderRoutes } from 'react-router-config';
import Routes from '../../../routes';
import getResources from './resources';

export default (request, store, context) => {
  const content = (
    <Provider store={store}>
      <StaticRouter context={context} location={request.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();
  const resources = getResources();

  return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="/favicon/favicon.ico">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="theme-color" content="#0077B5" />
        <link rel="manifest" href="/manifest.json" />
        ${resources.css.map(asset => `<link rel="stylesheet" href="/${asset}" />`).join('')}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
    </head>
    <body>
        <div id="root">${renderToString(content)}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${resources.js.map(asset => `<script src="/${asset}"></script>`).join('')}
    </body>
    </html>
  `;
};
