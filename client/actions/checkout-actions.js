import {
  createOrUpdateOrderRequest,
  createOrUpdateOrderSuccess,
  createOrUpdateOrderError,
} from '@actions/order-actions';

export const addCustomerToOrder = (customer, orderId) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(createOrUpdateOrderRequest());

      axios
        .post(`/api/checkout/customer/${orderId}`, customer.data)
        .then((response) => {
          dispatch(createOrUpdateOrderSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(createOrUpdateOrderError(error.data));
          reject(error.data);
        });
    });
  };
};
