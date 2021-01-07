import ACTIONS from 'constants/action-constants';
import { initial } from 'lodash';

const initialState = {
  loading: false,
  error: false,
  order: null,
};

const checkoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SUBMIT_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        order: null,
      };
    case ACTIONS.SUBMIT_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        order: payload,
      };
    case ACTIONS.SUBMIT_CHECKOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        order: null,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
