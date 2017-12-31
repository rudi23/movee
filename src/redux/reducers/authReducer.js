import authConstants from './../constants/authContants';

const defaultState = {
  isLogged: false,
  data: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case authConstants.FETCH_AUTH_CURRENT_USER:
      return action.payload || false;

    default:
      return state;
  }
};
