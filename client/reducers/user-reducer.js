import ACTIONS from '@constants-client/action-constants';

const initialState = {
  loading: false,
  error: false,
  user: null,
};

const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ACTIONS.CREATE_USER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        user: null,
      };

    case ACTIONS.CREATE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
      };

    case ACTIONS.CREATE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
