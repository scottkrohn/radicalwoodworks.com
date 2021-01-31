import ACTIONS from '@constants-client/action-constants';

const initialState = {
  loading: false,
  error: false,
  orders: null,
};

const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_ORDERS_COUNT_SUCCESS:
      return {
        ...state,
        ordersCount: {
          ...payload,
        },
      };

    case ACTIONS.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ACTIONS.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload.orders,
        limit: payload.limit,
        offset: payload.offset,
        sortCol: payload.sortCol,
      };

    case ACTIONS.GET_ORDERS_ERROR:
      return {
        ...state,
        loading: true,
        orders: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
