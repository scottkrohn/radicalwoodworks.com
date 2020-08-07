// import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getProducts = (ids) => {
  return (dispatch, getState, axios) => {
    dispatch(getProductsRequest());

    const url = `/api/products${
      Array.isArray(ids) && ids.length ? `?productIds=${ids.join(',')}` : ''
    }`;

    return new Promise((resolve, reject) => {
      axios
        .get(encodeURI(url))
        .then((response) => {
          if (response.status === 200) {
            dispatch(getProductsSuccess(response.data));
            resolve(response);
          } else {
            // Throw if we didn't get a 200 back.
            throw response;
          }
        })
        .catch((error) => {
          dispatch(getProductsError());
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
