import favouritesConstants from './../constants/favouritesContants';

export const defaultState = [6477];

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_FAVOURITES_SUCCESS':
      console.log('fetch', action.favourites);
      return action.favourites;

    case favouritesConstants.SAVE_FAVOURITES:
      console.log('save', action.favourites);
      return action.favourites;

    default:
      return state;
  }
};
