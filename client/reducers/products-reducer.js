import ACTIONS from '../constants/action-constants';

const initialState = {};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_PRODUCTS_REQUEST:
    case ACTIONS.GET_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ACTIONS.GET_PRODUCTS_SUCCESS:
    case ACTIONS.GET_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: false,
      };
    case ACTIONS.GET_PRODUCTS_ERROR:
    case ACTIONS.GET_CART_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
