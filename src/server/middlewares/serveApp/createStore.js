import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../../redux/reducers/index';
import { favouritesMiddleware } from '../../../redux/middlewares/favouritesMiddleware';

const storage = cookies => ({
  get: name => (cookies.get(name) ? cookies.get(name) : null),
  set: () => null,
});

export default ctx => {
  const extraArg = {
    storage: storage(ctx.cookies),
    apiAuthOptions: {
      baseUrl: 'http://react-ssr-api.herokuapp.com',
      options: {
        headers: { cookie: ctx.request.get('cookie') || '' },
      },
    },
  };

  const enhancer = applyMiddleware(thunk.withExtraArgument(extraArg), favouritesMiddleware(extraArg.storage));

  return createStore(reducer, {}, enhancer);
};
