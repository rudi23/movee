import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers/index';
import { favouritesMiddleware } from '../redux/middlewares/favouritesMiddleware';

export default (initialStore = {}) => {
  let enhancer = applyMiddleware(thunk, favouritesMiddleware);
  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(enhancer);
  }

  return createStore(reducer, initialStore, enhancer);
};
