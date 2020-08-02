import { get } from 'lodash';
import Cookie from 'js-cookie';

// Constants
import ACTIONS from 'constants/action-constants';

export const createCart = (productId, quantity, customerId = null) => {
  return (dispatch, getState, axios) => {
    dispatch(createCartRequest());

    const body = {
      customerId,
      items: [{ productId, quantity }],
    };

    axios
      .post('/api/cart', body)
      .then((response) => {
        const cartId = get(response, 'data.data.id');
        cartId && Cookie.set('cartId', cartId), { expires: 2 };
        dispatch(createCartSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createCartError(error));
      });
  };
};

export const getCartById = (cartId) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(getCartRequest());
      axios
        .get(`/api/cart${cartId ? `/${cartId}` : ''}`)
        .then((response) => {
          const cartId = get(response, 'data.data.id');
          cartId && Cookie.set('cartId', cartId), { expires: 2 };
          dispatch(getCartSuccess(response.data));
          resolve();
        })
        .catch((error) => {
          dispatch(getCartError(error));
          reject();
        });
    });
  };
};

export const addItemToCart = (cartId, productId, quantity) => {
  return (dispatch, getState, axios) => {
    dispatch(addToCartRequest());

    const body = {
      items: [
        {
          productId,
          quantity,
        },
      ],
    };

    axios
      .put(`/api/cart/${cartId}`, body)
      .then((response) => {
        dispatch(addToCartSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addToCartError(error));
      });
  };
};

/*******************/
/* Action Creators */
/*******************/

const addToCartRequest = () => {
  return {
    type: ACTIONS.ADD_TO_CART_REQUEST,
    payload: {},
  };
};

const addToCartSuccess = (cart) => {
  return {
    type: ACTIONS.ADD_TO_CART_SUCCESS,
    payload: cart,
  };
};

const addToCartError = (error) => {
  return {
    type: ACTIONS.ADD_TO_CART_ERROR,
    payload: error,
  };
};

const getCartRequest = () => {
  return {
    type: ACTIONS.GET_CART_REQUEST,
    payload: {},
  };
};

const getCartSuccess = (cart) => {
  return {
    type: ACTIONS.GET_CART_SUCCESS,
    payload: cart,
  };
};

const getCartError = (error) => {
  return {
    type: ACTIONS.GET_CART_ERROR,
    payload: error,
  };
};

const createCartRequest = () => {
  return {
    type: ACTIONS.CREATE_CART_REQUEST,
    payload: {},
  };
};

const createCartSuccess = (cart) => {
  return {
    type: ACTIONS.CREATE_CART_SUCCESS,
    payload: cart,
  };
};

const createCartError = (error) => {
  return {
    type: ACTIONS.CREATE_CART_ERROR,
    payload: error,
  };
};
