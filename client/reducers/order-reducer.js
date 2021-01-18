import ACTIONS from '@constants-client/action-constants';

const initialState = {
  loading: false,
  error: false,
  order: null,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.CLEAR_ORDER: {
      return {
        ...state,
        loading: false,
        error: false,
        order: null,
      };
    }
    case ACTIONS.CREATE_OR_UPDATE_ORDER_REQUEST:
    case ACTIONS.GET_ORDER_REQUEST:
    case ACTIONS.SUBMIT_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ACTIONS.CREATE_OR_UPDATE_ORDER_SUCCESS:
    case ACTIONS.GET_ORDER_SUCCESS:
    case ACTIONS.SUBMIT_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        order: payload,
      };
    case ACTIONS.CREATE_OR_UPDATE_ORDER_ERROR:
    case ACTIONS.GET_ORDER_ERROR:
    case ACTIONS.SUBMIT_CHECKOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
