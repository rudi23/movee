import authConstants from '../constants/authContants';
import authRepository from '../../repository/authRepository';

export const fetchCurrentUser = () => async (dispatch, getState, { apiAuthOptions }) => {
  const currentUser = await authRepository(apiAuthOptions).getCurrentUser();

  dispatch({
    type: authConstants.FETCH_AUTH_CURRENT_USER,
    payload: {
      isLogged: !!currentUser,
      data: currentUser || null,
    },
  });
};
