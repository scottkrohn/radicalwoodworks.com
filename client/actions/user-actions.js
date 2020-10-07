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

export const updateAccount = (userData) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(updateAccountRequest());

      axios
        .put('/api/user', userData)
        .then((response) => {
          dispatch(updateAccountSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(updateAccountError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

export const updatePassword = (username, oldPassword, newPassword) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(updatePasswordRequest());
      const body = {
        username,
        password: newPassword,
        oldPassword,
      };

      axios
        .put('/api/user/reset', body)
        .then((response) => {
          dispatch(updatePasswordSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(updatePasswordError(error.response.data));
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

const updateAccountRequest = () => {
  return {
    type: ACTIONS.UPDATE_USER_REQUEST,
    payload: {},
  };
};

const updateAccountSuccess = (user) => {
  return {
    type: ACTIONS.UPDATE_USER_SUCCESS,
    payload: user,
  };
};

const updateAccountError = (error) => {
  return {
    type: ACTIONS.UPDATE_USER_ERROR,
    payload: error,
  };
};

const updatePasswordRequest = () => {
  return {
    type: ACTIONS.UPDATE_PASSWORD_REQUEST,
    payload: {},
  };
};

const updatePasswordSuccess = (user) => {
  return {
    type: ACTIONS.UPDATE_PASSWORD_SUCCESS,
    payload: user,
  };
};

const updatePasswordError = (error) => {
  return {
    type: ACTIONS.UPDATE_PASSWORD_ERROR,
    payload: error,
  };
};
