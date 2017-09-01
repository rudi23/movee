import favouriteShowsConstants from '../constants/favouriteShowsContants';
import showRepository from '../../repository/tvShowRepository';

export const fetchFavouriteShows = favouriteIds => (dispatch) => {
  dispatch({
    type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_PENDING,
  });

  return showRepository.findByIds([...favouriteIds])
    .then(
      shows => dispatch({
        type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_SUCCESS,
        shows,
      })
    )
    .catch(
      error => dispatch({
        type: favouriteShowsConstants.FETCH_FAVOURITE_SHOWS_ERROR,
        error,
      })
    );
};
