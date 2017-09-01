import { combineReducers } from 'redux';
import favourites from './favouritesReducer';

const reducers = combineReducers({
  favourites,
});

export default reducers;
