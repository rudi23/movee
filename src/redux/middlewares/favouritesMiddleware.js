import favouritesConstants from '../constants/favouritesContants';
import favouriteRepository from '../../repository/favouriteRepository';

export const favouritesMiddleware = storage => store => next => action => {
  if (action.type === favouritesConstants.FETCH_FAVOURITES) {
    const response = next(action);

    store.dispatch({
      type: favouritesConstants.FETCH_FAVOURITES_PENDING,
    });

    try {
      store.dispatch({
        type: favouritesConstants.FETCH_FAVOURITES_SUCCESS,
        favourites: [...favouriteRepository(storage).findAll()],
      });
    } catch (error) {
      store.dispatch({
        type: favouritesConstants.FETCH_FAVOURITES_FAILED,
        error,
      });
    }

    return response;
  }

  return next(action);
};
