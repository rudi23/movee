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
    .catch((error) => {
      if (error.message === 'Not Found') {
        return dispatch({
          type: tvShowConstants.FETCH_SHOW_SUCCESS,
          show: null,
        });
      }

      return dispatch({
        type: tvShowConstants.FETCH_SHOW_FAILED,
        error,
      });
    });
};

export const fetchTvShowSeasonAndEpisodes = showId => (dispatch) => {
  dispatch({
    type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_PENDING,
  });

  return tvShowRepository.findSeasonsWithEpisodes(showId)
    .then(
      seasons => dispatch({
        type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_SUCCESS,
        seasons,
      })
    )
    .catch((error) => {
      if (error.message === 'Not Found') {
        return dispatch({
          type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_SUCCESS,
          seasons: null,
        });
      }

      return dispatch({
        type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_FAILED,
        error,
      });
    });
};