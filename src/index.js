import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './components/app';

store.dispatch({ type: 'FETCH_FAVOURITES' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
