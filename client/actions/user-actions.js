import ACTIONS from '@constants-client/action-constants';

export const createAccount = (userData) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(createUserAccountRequest());

      axios
        .post('/auth/signup', userData)
        .then((response) => {
          dispatch(createUserAccountSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(createUserAccountError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

const createUserAccountRequest = () => {
  return {
    type: ACTIONS.CREATE_USER_ACCOUNT_REQUEST,
    payload: {},
  };
};

const createUserAccountSuccess = (user) => {
  return {
    type: ACTIONS.CREATE_USER_ACCOUNT_SUCCESS,
    payload: user,
  };
};

const createUserAccountError = (error) => {
  return {
    type: ACTIONS.CREATE_USER_ACCOUNT_ERROR,
    payload: error,
  };
};
