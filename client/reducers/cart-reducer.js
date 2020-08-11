import ACTIONS from 'client/constants/action-constants';

const initialState = {
  loading: false,
  error: false,
  cart: null,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_OR_UPDATE_CART_ITEM_REQUEST:
    case ACTIONS.CREATE_CART_REQUEST:
    case ACTIONS.GET_CART_REQUEST:
    case ACTIONS.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ACTIONS.ADD_OR_UPDATE_CART_ITEM_SUCCESS:
    case ACTIONS.CREATE_CART_SUCCESS:
    case ACTIONS.GET_CART_SUCCESS:
    case ACTIONS.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        cart: payload,
      };
    case ACTIONS.ADD_OR_UPDATE_CART_ITEM_ERROR:
    case ACTIONS.CREATE_CART_ERROR:
    case ACTIONS.GET_CART_ERROR:
    case ACTIONS.CLEAR_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
