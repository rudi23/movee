import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { favouritesInitiator } from './redux/middlewares/favouritesMiddleware';
import './index.css';

import App from './components/app';

// wyciagnac do osobnego store'a

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, favouritesInitiator))
);

store.dispatch({ type: 'FETCH_FAVOURITES' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
