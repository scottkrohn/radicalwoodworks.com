// Constants
import ACTIONS from 'constants/action-constants';
import Cookie from 'js-cookie';
import { get } from 'lodash';

export const getOrder = (orderId = null, includeProducts) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(getOrderRequest());

      const requestUrl = `/api/order${
        orderId ? `/${orderId}` : ''
      }?includeProducts=${includeProducts}`;

      axios
        .get(requestUrl)
        .then((response) => {
          dispatch(getOrderSuccess(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(getOrderError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

export const createOrUpdateOrder = (cartId, userId) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(createOrUpdateOrderRequest());
      const body = {
        userId,
        cartId,
      };

      axios
        .post('/api/order', body)
        .then((response) => {
          dispatch(createOrUpdateOrderSuccess(response.data));
          const orderId = get(response, 'data.data.id', null);
          orderId && Cookie.set('orderId', orderId), { expires: 2 };
          resolve(response.data);
        })
        .catch((error) => {
          dispatch(createOrUpdateOrderError(error.response.data));
          reject(error.response.data);
        });
    });
  };
};

export const createOrUpdateOrderRequest = () => {
  return {
    type: ACTIONS.CREATE_OR_UPDATE_ORDER_REQUEST,
    payload: {},
  };
};

export const createOrUpdateOrderSuccess = (order) => {
  return {
    type: ACTIONS.CREATE_OR_UPDATE_ORDER_SUCCESS,
    payload: order,
  };
};

export const createOrUpdateOrderError = (error) => {
  return {
    type: ACTIONS.CREATE_OR_UPDATE_ORDER_ERROR,
    payload: error,
  };
};

const getOrderRequest = () => {
  return {
    type: ACTIONS.GET_ORDER_REQUEST,
    payload: {},
  };
};

const getOrderSuccess = (order) => {
  return {
    type: ACTIONS.GET_ORDER_SUCCESS,
    payload: order,
  };
};

const getOrderError = (error) => {
  return {
    type: ACTIONS.GET_ORDER_ERROR,
    payload: error,
  };
};
