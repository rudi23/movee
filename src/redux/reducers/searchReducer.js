import searchConstants from './../constants/searchContants';

export const defaultState = {
  query: '',
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

    default:
      return state;
  }
};
