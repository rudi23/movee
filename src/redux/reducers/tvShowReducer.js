import { FETCH_STATES } from './../../components/constants';
import tvShowConstants from './../constants/tvShowContants';

export const defaultState = {
  fetchState: null,
  data: null,
  seasons: {
    fetchState: null,
    data: null,
  },
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case tvShowConstants.FETCH_SHOW_PENDING:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.PENDING,
        data: null,
      });

    case tvShowConstants.FETCH_SHOW_SUCCESS:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.SUCCESS,
        data: action.show,
      });

    case tvShowConstants.FETCH_SHOW_FAILED:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.FAILED,
        data: null,
      });

    case tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_PENDING:
      return Object.assign({}, state, {
        seasons: {
          fetchState: FETCH_STATES.PENDING,
          data: null,
        },
      });

    case tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_SUCCESS:
      return Object.assign({}, state, {
        seasons: {
          fetchState: FETCH_STATES.SUCCESS,
          data: action.seasons,
        },
      });

    case tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_FAILED:
      return Object.assign({}, state, {
        seasons: {
          fetchState: FETCH_STATES.FAILED,
          data: null,
        },
      });

    default:
      return state;
  }
};
