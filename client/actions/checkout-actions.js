import ACTIONS from 'constants/action-constants';
import Cookie from 'js-cookie';
import {
  createOrUpdateOrderRequest,
  createOrUpdateOrderSuccess,
  createOrUpdateOrderError,
} from '@actions/order-actions';
import { clearCartSuccess } from '@actions/cart-actions';
import ORDER from '@constants/order-constants';

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

export const submitCheckout = (order) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(submitCheckoutRequest());

      order.setStatus(ORDER.STATUS.NEW);

      axios
        .put(`/api/order/${order.getId()}`, order.data)
        .then((response) => {
          dispatch(clearCartSuccess(null));
          dispatch(submitCheckoutSuccess(response.data));
          Cookie.remove('orderId');
          Cookie.remove('cartId');
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch(submitCheckoutError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

const submitCheckoutRequest = () => {
  return {
    type: ACTIONS.SUBMIT_CHECKOUT_REQUEST,
    payload: {},
  };
};

const submitCheckoutSuccess = (order) => {
  return {
    type: ACTIONS.SUBMIT_CHECKOUT_SUCCESS,
    payload: order,
  };
};

const submitCheckoutError = (error) => {
  return {
    type: ACTIONS.SUBMIT_CHECKOUT_ERROR,
    payload: error,
  };
};
