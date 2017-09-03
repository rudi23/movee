import searchConstants from '../constants/searchContants';


export const setQuery = query => (dispatch) => {
  dispatch({
    type: searchConstants.SET_QUERY,
    query,
  });
};

export const clearQuery = () => (dispatch) => {
  dispatch({
    type: searchConstants.CLEAR_QUERY,
  });
};
