import favouritesConstants from './../constants/favouritesContants';

export const defaultState = [6477];

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_FAVOURITES_SUCCESS':
      return action.favourites;

    case favouritesConstants.SAVE_FAVOURITES:
      return action.favourites;

    default:
      return state;
  }
};
