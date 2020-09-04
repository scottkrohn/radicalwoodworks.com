import {
  createOrUpdateOrderRequest,
  createOrUpdateOrderSuccess,
  createOrUpdateOrderError,
} from '@actions/order-actions';

export const addAddressToOrder = (address, orderId) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(createOrUpdateOrderRequest());

      axios
        .post(`/api/checkout/address/${orderId}`, address.data)
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
