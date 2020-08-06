// import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getProducts = (ids, isForCart = false) => {
  return (dispatch, getState, axios) => {
    dispatch(isForCart ? getCartProductsRequest() : getProductsRequest());

    const url = `/api/products${
      Array.isArray(ids) && ids.length ? `?productIds=${ids.join(',')}` : ''
    }`;

    return new Promise((resolve, reject) => {
      axios
        .get(encodeURI(url))
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              isForCart
                ? getCartProductsSuccess(response.data)
                : getProductsSuccess(response.data)
            );
            resolve(response);
          } else {
            // Throw if we didn't get a 200 back.
            throw response;
          }
        })
        .catch((error) => {
          dispatch(isForCart ? getCartProductsError : getProductsError());
          reject(error);
        });
    });
  };
};

/*******************/
/* Action Creators */
/*******************/

const getProductsRequest = () => {
  return {
    type: ACTIONS.GET_PRODUCTS_REQUEST,
    payload: {},
  };
};

const getProductsSuccess = (results) => {
  return {
    type: ACTIONS.GET_PRODUCTS_SUCCESS,
    payload: {
      products: results,
    },
  };
};

const getProductsError = (error) => {
  return {
    type: ACTIONS.GET_PRODUCTS_ERROR,
    payload: {
      error,
    },
  };
};

const getCartProductsRequest = () => {
  return {
    type: ACTIONS.GET_CART_PRODUCTS_REQUEST,
    payload: {},
  };
};

const getCartProductsSuccess = (results) => {
  return {
    type: ACTIONS.GET_CART_PRODUCTS_SUCCESS,
    payload: {
      cartProducts: results,
    },
  };
};

const getCartProductsError = (error) => {
  return {
    type: ACTIONS.GET_CART_PRODUCTS_ERROR,
    payload: {
      error,
    },
  };
};
