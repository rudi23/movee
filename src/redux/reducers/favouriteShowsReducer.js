import { FETCH_STATES } from './../../components/constants';
import favouriteShowsConstants from './../constants/favouriteShowsContants';

export const defaultState = {
  data: [],
  fetchState: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_PENDING:
      return Object.assign({}, state, {
        data: [],
        fetchState: FETCH_STATES.PENDING,
      });

    case favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_SUCCESS:
      return Object.assign({}, state, {
        data: action.shows,
        fetchState: FETCH_STATES.SUCCESS,
      });

    case favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_FAILED:
      return Object.assign({}, state, {
        data: [],
        fetchState: FETCH_STATES.FAILED,
      });

    default:
      return state;
  }
};
