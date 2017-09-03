import { combineReducers } from 'redux';
import favourites from './favouritesReducer';
import favouriteShows from './favouriteShowsReducer';
import tvShow from './tvShowReducer';
import search from './searchReducer';

const reducers = combineReducers({
  favourites,
  favouriteShows,
  tvShow,
  search,
});

export default reducers;
