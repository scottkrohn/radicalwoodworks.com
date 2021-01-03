import ACTIONS from 'constants/action-constants';

export const getOrders = () => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(getOrdersRequest());

      axios
        .get('/api/orders/')
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
