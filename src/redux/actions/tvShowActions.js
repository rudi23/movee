import tvShowConstants from '../constants/tvShowContants';
import tvShowRepository from '../../repository/tvShowRepository';

export const fetchTvShow = showId => async (dispatch) => {
  dispatch({
    type: tvShowConstants.FETCH_SHOW_PENDING,
  });

  try {
    const show = await tvShowRepository.findById(showId);
    dispatch({
      type: tvShowConstants.FETCH_SHOW_SUCCESS,
      show,
    });
  } catch (error) {
    if (error.message === 'Not Found') {
      dispatch({
        type: tvShowConstants.FETCH_SHOW_SUCCESS,
        show: null,
      });
    } else {
      dispatch({
        type: tvShowConstants.FETCH_SHOW_FAILED,
        error,
      });
    }
  }
};

export const fetchTvShowSeasonAndEpisodes = showId => async (dispatch) => {
  dispatch({
    type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_PENDING,
  });

  try {
    const seasons = await tvShowRepository.findSeasonsWithEpisodes(showId);
    dispatch({
      type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_SUCCESS,
      seasons,
    });
  } catch (error) {
    if (error.message === 'Not Found') {
      dispatch({
        type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_SUCCESS,
        seasons: null,
      });
    } else {
      dispatch({
        type: tvShowConstants.FETCH_SHOW_SEASON_AND_EPISODES_FAILED,
        error,
      });
    }
  }
};

// eslint-disable-next-line arrow-body-style
export const fetchTvShowAllDetails = showId => (dispatch) => {
  return fetchTvShow(showId)(dispatch).then(() => fetchTvShowSeasonAndEpisodes(showId)(dispatch));
};
