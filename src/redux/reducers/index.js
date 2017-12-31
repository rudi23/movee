import { combineReducers } from 'redux';
import favourites from './favouritesReducer';
import favouriteShows from './favouriteShowsReducer';
import tvShow from './tvShowReducer';
import search from './searchReducer';
import schedule from './scheduleReducer';
import auth from './authReducer';

const reducer = combineReducers({
  favourites,
  favouriteShows,
  tvShow,
  search,
  schedule,
  auth,
});

export default reducer;
