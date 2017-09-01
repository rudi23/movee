import { combineReducers } from 'redux';
import favourites from './favouritesReducer';
import favouriteShows from './favouriteShowsReducer';

const reducers = combineReducers({
  favourites,
  favouriteShows,
});

export default reducers;
