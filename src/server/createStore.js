import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers/index';
import { favouritesMiddleware } from '../redux/middlewares/favouritesMiddleware';

const storage = {
  getItem: () => null,
  setItem: () => null,
};

export default () => {
  const enhancer = applyMiddleware(
    thunk.withExtraArgument(storage),
    favouritesMiddleware(storage)
  );

  return createStore(reducer, { favourites: [9659] }, enhancer);
};
