import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { favouritesInitiator } from './redux/middlewares/favouritesMiddleware';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, favouritesInitiator))
);

store.dispatch({ type: 'FETCH_FAVOURITES' });

export default store;
