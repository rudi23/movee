// This is supplied by WebpackConfiguration
/* global POLYFILL_OBJECT_ASSIGN */
/* global POLYFILL_OBJECT_VALUES */
/* global POLYFILL_PROMISES */
/* global POLYFILL_FETCH */
/* global POLYFILL_URL */
/* global ALLOW_OFFLINE */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';

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

store.dispatch({ type: 'FETCH_FAVOURITES' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (ALLOW_OFFLINE) {
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install();
}
