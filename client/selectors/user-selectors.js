import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';
import User from '@models/user';
import AUTH from '@constants/auth-constants';

export const getLoading = (state) => state.user.loading;
export const selectErrorCode = (state) => state.user.error.code;
export const selectErrorMessage = (state) => state.user.error.message;
const getUserFromState = (state) => state.user.user;

export const selectUser = createSelector([getUserFromState], (userData) => {
  if (isEmpty(userData)) {
    return null;
  }

  const userModel = new User();
  userModel.setValues(userData.data);

  return userModel;
});

export const selectIsAdmin = createSelector([selectUser], (user) => {
  if (isEmpty(user)) {
    return false;
  }

  return user.getType() === AUTH.USER_TYPES.ADMIN;
});
