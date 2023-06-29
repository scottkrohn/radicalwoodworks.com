import ACTIONS from '../constants/action-constants';

const initialState = {
  token: null,
  loggedIn: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SEND_LOGIN_REQUEST:
    case ACTIONS.VERIFY_LOGIN_REQUEST:
      return {
        ...state,
        sending: true,
        error: false,
        loggedIn: false,
      };
    case ACTIONS.SEND_LOGIN_ERROR:
      return {
        ...state,
        ...payload,
        sending: false,
        error: true,
        loggedIn: false,
      };
    case ACTIONS.VERIFY_LOGIN_ERROR:
      return {
        ...state,
        ...payload,
        sending: false,
        error: false,
        loggedIn: false,
      };
    case ACTIONS.SEND_LOGIN_SUCCESS:
    case ACTIONS.VERIFY_LOGIN_SUCCESS:
      return {
        ...state,
        sending: false,
        error: false,
        loggedIn: true,
        user: payload,
      };
    case ACTIONS.SEND_LOGOUT_REQUEST:
      return {
        ...state,
        sending: true,
        error: false,
        loggedIn: true,
      };
    case ACTIONS.SEND_LOGOUT_ERROR:
      return {
        ...state,
        ...payload,
        sending: false,
        error: true,
        loggedIn: true,
      };
    case ACTIONS.SEND_LOGOUT_SUCCESS:
      return {
        ...state,
        ...payload,
        sending: false,
        error: false,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
