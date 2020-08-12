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

export const getCartById = (cartId, includeProducts = false) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(addOrUpdateCartItemRequest());

      const url = `/api/cart${
        cartId ? `/${cartId}` : ''
      }?includeProducts=${includeProducts}`;

      axios
        .get(encodeURI(url))
        .then((response) => {
          const cartId = get(response, 'data.data.id');
          cartId && Cookie.set('cartId', cartId), { expires: 2 };
          dispatch(getCartSuccess(response.data));
          resolve();
        })
        .catch((error) => {
          dispatch(getCartError(error.data));
          reject();
        });
    });
  };
};

export const addOrUpdateCartItem = (cartId, productId, quantity, notes) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(addToCartRequest());

      const body = {
        items: [
          {
            productId,
            quantity,
            notes,
          },
        ],
      };

      axios
        .put(`/api/cart/${cartId}`, body)
        .then((response) => {
          dispatch(addOrUpdateCartItemSuccess(response.data));
          resolve();
        })
        .catch((error) => {
          dispatch(addOrUpdateCartItemError(error));
          reject();
        });
    });
  };
};

export const clearCart = (cartId) => {
  return (dispatch, getState, axios) => {
    dispatch(clearCartRequest());
    axios
      .delete(`/api/cart/${cartId}`)
      .then((response) => {
        dispatch(clearCartSuccess(response.data));
      })
      .catch((error) => {
        dispatch(clearCartError(error));
      });
  };
};

/*******************/
/* Action Creators */
/*******************/

const addToCartRequest = () => {
  return {
    type: ACTIONS.ADD_OR_UPDATE_CART_ITEM_REQUEST,
    payload: {},
  };
};

const addOrUpdateCartItemSuccess = (cart) => {
  return {
    type: ACTIONS.ADD_OR_UPDATE_CART_ITEM_SUCCESS,
    payload: cart,
  };
};

const addOrUpdateCartItemError = (error) => {
  return {
    type: ACTIONS.ADD_OR_UPDATE_CART_ITEM_ERROR,
    payload: error,
  };
};

const addOrUpdateCartItemRequest = () => {
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

const clearCartRequest = () => {
  return {
    type: ACTIONS.CLEAR_CART_REQUEST,
    payload: {},
  };
};

const clearCartSuccess = (cart) => {
  return {
    type: ACTIONS.CLEAR_CART_SUCCESS,
    payload: cart,
  };
};

const clearCartError = (error) => {
  return {
    type: ACTIONS.CLEAR_CART_ERROR,
    payload: error,
  };
};
