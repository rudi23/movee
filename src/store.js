import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { favouritesMiddleware } from './redux/middlewares/favouritesMiddleware';

let enhancer = applyMiddleware(thunk, favouritesMiddleware);
if (process.env.NODE_ENV !== 'production') {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(
  rootReducer,
  enhancer
);

export default store;
