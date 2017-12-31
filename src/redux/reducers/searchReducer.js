import { FETCH_STATES } from '../../constants';
import searchConstants from '../constants/searchContants';

export const defaultState = {
  query: '',
  results: {
    fetchState: null,
    data: [],
  },
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case searchConstants.SET_QUERY:
      return Object.assign({}, state, {
        query: action.query,
        results: defaultState.results,
      });

    case searchConstants.CLEAR_QUERY:
      return Object.assign({}, state, {
        query: '',
        results: defaultState.results,
      });

    case searchConstants.FETCH_RESULTS_PENDING:
      return Object.assign({}, state, {
        results: {
          fetchState: FETCH_STATES.PENDING,
          data: defaultState.results.data,
        },
      });

    case searchConstants.FETCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        results: {
          fetchState: FETCH_STATES.SUCCESS,
          data: action.results,
        },
      });

    case searchConstants.FETCH_RESULTS_FAILED:
      return Object.assign({}, state, {
        results: {
          fetchState: FETCH_STATES.FAILED,
          data: defaultState.results.data,
        },
      });

    default:
      return state;
  }
};
