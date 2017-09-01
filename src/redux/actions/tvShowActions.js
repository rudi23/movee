import tvShowConstants from '../constants/tvShowContants';
import tvShowRepository from '../../repository/tvShowRepository';

export const fetchTvShow = showId => (dispatch) => {
  dispatch({
    type: tvShowConstants.FETCH_SHOW_PENDING,
  });

  return tvShowRepository.findById(showId)
    .then(
      show => dispatch({
        type: tvShowConstants.FETCH_SHOW_SUCCESS,
        show,
      })
    )
    .catch(
      error => dispatch({
        type: tvShowConstants.FETCH_SHOW_FAILED,
        error,
      })
    );
};
