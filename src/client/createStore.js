import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers/index';
import { favouritesMiddleware } from '../redux/middlewares/favouritesMiddleware';

export default (initialStore = {}) => {
  const extraArg = { storage: window.localStorage };

  let enhancer = applyMiddleware(
    thunk.withExtraArgument(extraArg),
    favouritesMiddleware(extraArg.storage)
  );

  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(enhancer);
  }

  return createStore(reducer, initialStore, enhancer);
};
