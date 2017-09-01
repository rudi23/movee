import { combineReducers } from 'redux';
import favourites from './favouritesReducer';
import favouriteShows from './favouriteShowsReducer';
import tvShow from './tvShowReducer';

const reducers = combineReducers({
  favourites,
  favouriteShows,
  tvShow,
});

export default reducers;
