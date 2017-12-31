// This is supplied by WebpackConfiguration
/* global POLYFILL_OBJECT_ASSIGN */
/* global POLYFILL_OBJECT_VALUES */
/* global POLYFILL_PROMISES */
/* global POLYFILL_FETCH */
/* global POLYFILL_URL */
/* global ALLOW_OFFLINE */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import createStore from './client/createStore';
import routes from './routes';

if (POLYFILL_OBJECT_ASSIGN) {
  // eslint-disable-next-line global-require
  require('object-assign-polyfill');
}
if (POLYFILL_OBJECT_VALUES) {
  // eslint-disable-next-line global-require
  require('object.values').shim();
}
if (POLYFILL_PROMISES) {
  // eslint-disable-next-line global-require
  window.Promise = require('promise-polyfill');
}
if (POLYFILL_FETCH) {
  // eslint-disable-next-line global-require
  require('unfetch/polyfill');
}
if (POLYFILL_URL) {
  // eslint-disable-next-line global-require
  require('url-polyfill');
}

const store = createStore(window.INITIAL_STATE);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (ALLOW_OFFLINE) {
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install();
}
