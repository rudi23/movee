import favouriteShowsConstants from '../constants/favouriteShowsContants';
import showRepository from '../../repository/tvShowRepository';

export const fetchFavouriteShows = favouriteIds => async (dispatch) => {
  dispatch({
    type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_PENDING,
  });

  try {
    const shows = await showRepository.findByIds([...favouriteIds]);
    dispatch({
      type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_SUCCESS,
      shows,
    });
  } catch (error) {
    dispatch({
      type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_FAILED,
      error,
    });
  }
};
