import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import createStore from './createStore';

import '../../public/css/index.css';
import '../../public/css/font-awesome.css';

const store = createStore(window.INITIAL_STATE);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
