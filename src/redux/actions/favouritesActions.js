import favouritesConstants from '../constants/favouritesContants';
import favouriteRepository from '../../repository/favouriteRepository';

export const saveFavourites = favourites => dispatch => {
  dispatch({
    type: favouritesConstants.SAVE_FAVOURITES,
    favourites,
  });
};

export const toggleFavourite = tvShowId => (dispatch, getState, { storage }) => {
  const favourites = new Set(getState().favourites);

  if (favourites.has(tvShowId)) {
    favourites.delete(tvShowId);
  } else {
    favourites.add(tvShowId);
  }

  favouriteRepository(storage).save([...favourites]);

  saveFavourites([...favourites])(dispatch);
};
