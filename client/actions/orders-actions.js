import ACTIONS from 'constants/action-constants';
import queryString from 'query-string';

export const getOrders = (offset = 0, limit, sort) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(getOrdersRequest());

      const query = queryString.stringify({ limit, offset, sort });

      axios
        .get(`/api/orders${query && `?${query}`}`)
        .then((response) => {
          dispatch(getOrdersSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(getOrdersError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

export const getOrderCount = (orderStatuses = []) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      const orderStatusString = orderStatuses.join(',');
      const url = `/api/orders/count${
        orderStatusString && `?orderStatuses=${orderStatusString}`
      }`;

      axios.get(url).then((response) => {
        dispatch(getOrdersCountSuccess(response.data));
      });
    });
  };
};

const getOrdersRequest = () => {
  return {
    type: ACTIONS.GET_ORDERS_REQUEST,
    payload: {},
  };
};

const getOrdersSuccess = (orders) => {
  return {
    type: ACTIONS.GET_ORDERS_SUCCESS,
    payload: orders,
  };
};

const getOrdersError = (error) => {
  return {
    type: ACTIONS.GET_ORDERS_ERROR,
    payload: error,
  };
};

const getOrdersCountRequest = () => {
  return {
    type: ACTIONS.GET_ORDERS_COUNT_REQUEST,
    payload: {},
  };
};

const getOrdersCountSuccess = (ordersCount) => {
  return {
    type: ACTIONS.GET_ORDERS_COUNT_SUCCESS,
    payload: ordersCount,
  };
};

const getOrdersCountError = (error) => {
  return {
    type: ACTIONS.GET_ORDERS_COUNT_ERROR,
    payload: error,
  };
};
