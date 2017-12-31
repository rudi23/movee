import searchConstants from '../constants/searchContants';
import showRepository from '../../repository/tvShowRepository';


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

export const fetchResults = query => async (dispatch) => {
  dispatch({
    type: searchConstants.FETCH_RESULTS_PENDING,
  });

  try {
    const results = await showRepository.search(query);
    dispatch({
      type: searchConstants.FETCH_RESULTS_SUCCESS,
      results,
    });
  } catch (error) {
    dispatch({
      type: searchConstants.FETCH_RESULTS_FAILED,
      error,
    });
  }
};
