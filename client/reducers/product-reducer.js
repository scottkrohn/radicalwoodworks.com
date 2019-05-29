import ACTIONS from 'constants/action-constants';
import Product from 'model/product';

const initialState = {
  loading: false,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_PRODUCT_REQUEST:
    case ACTIONS.CREATE_PRODUCT_REQUEST:
    case ACTIONS.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ACTIONS.GET_PRODUCT_SUCCESS:
    case ACTIONS.CREATE_PRODUCT_SUCCESS:
    case ACTIONS.UPDATE_PRODUCT_SUCCESS:
    case ACTIONS.CLEAR_PRODUCT_REQUEST:
      return {
        ...state,
        ...payload,
        loading: false,
        error: false,
      };
    case ACTIONS.GET_PRODUCT_ERROR:
    case ACTIONS.CREATE_PRODUCT_ERROR:
    case ACTIONS.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default productReducer;
