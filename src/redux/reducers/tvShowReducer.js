import { FETCH_STATES } from './../../components/constants';
import tvShowConstants from './../constants/tvShowContants';

export const defaultState = {
  fetchState: null,
  data: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case tvShowConstants.FETCH_SHOW_PENDING:
      return Object.assign({}, state, {
        data: null,
        fetchState: FETCH_STATES.PENDING,
      });

    case tvShowConstants.FETCH_SHOW_SUCCESS:
      return Object.assign({}, state, {
        data: action.show,
        fetchState: FETCH_STATES.SUCCESS,
      });

    case tvShowConstants.FETCH_SHOW_FAILED:
      return Object.assign({}, state, {
        data: null,
        fetchState: FETCH_STATES.FAILED,
      });

    default:
      return state;
  }
};
