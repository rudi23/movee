import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers/index';
import { favouritesMiddleware } from '../redux/middlewares/favouritesMiddleware';

const storage = cookies => ({
  get: name => (cookies[name] ? cookies[name] : null),
  set: () => null,
});

export default (req) => {
  const storageInstance = storage(req.cookies);

  const enhancer = applyMiddleware(
    thunk.withExtraArgument(storageInstance),
    favouritesMiddleware(storageInstance)
  );

  return createStore(reducer, {}, enhancer);
};
