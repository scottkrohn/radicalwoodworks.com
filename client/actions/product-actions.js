import { get } from 'lodash';

// Constants
import ACTIONS from '../constants/action-constants';

export const getProduct = (productId) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(getProductRequest());

      if (!productId) {
        reject();
      }

      axios
        .get(`/api/products/${productId}`)
        .then((response) => {
          dispatch(getProductSuccess(response.data));
          resolve();
        })
        .catch((error) => {
          dispatch(getProductError(error));
          reject();
        });
    });
  };
};

export const createProduct = (product) => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(createProductRequest());

      const body = {
        data: product.getValues(),
      };

      axios
        .post('/api/products/create', body)
        .then((result) => {
          const productId = get(result, 'data.id', null);

          if (!productId) {
            throw new Error('Error occured while creating product');
          }

          dispatch(createProductSuccess());
          resolve(productId);
        })
        .catch((error) => {
          dispatch(createProductError());
          reject(error);
        });
    });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch, getState, axios) => {
    dispatch(deleteProductRequest());

    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/products/${productId}`)
        .then((response) => {
          dispatch(deleteProductSuccess());
          resolve(response);
        })
        .catch((error) => {
          dispatch(deleteProductError());
          reject(error);
        });
    });
  };
};

export const updateProduct = (product) => {
  return (dispatch, getState, axios) => {
    dispatch(updateProductRequest());
    const body = {
      data: product.getValues(),
    };

    return new Promise((resolve, reject) => {
      axios
        .put('/api/products/update', body)
        .then((response) => {
          dispatch(updateProductSuccess());
          resolve();
        })
        .catch((error) => {
          dispatch(updateProductError());
          reject();
        });
    });
  };
};

export const clearProduct = () => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      dispatch(clearProductRequest());
      resolve();
    });
  };
};

/*******************/
/* Action Creators */
/*******************/

const clearProductRequest = () => {
  return {
    type: ACTIONS.CLEAR_PRODUCT_REQUEST,
    payload: {
      product: null,
    },
  };
};

const createProductRequest = () => {
  return {
    type: ACTIONS.CREATE_PRODUCT_REQUEST,
    payload: {},
  };
};

const createProductSuccess = () => {
  return {
    type: ACTIONS.CREATE_PRODUCT_SUCCESS,
    payload: {},
  };
};

const createProductError = (error) => {
  return {
    type: ACTIONS.CREATE_PRODUCT_ERROR,
    payload: error,
  };
};

const updateProductRequest = () => {
  return {
    type: ACTIONS.UPDATE_PRODUCT_REQUEST,
    payload: {},
  };
};

const updateProductSuccess = () => {
  return {
    type: ACTIONS.UPDATE_PRODUCT_SUCCESS,
    payload: {},
  };
};

const updateProductError = (error) => {
  return {
    type: ACTIONS.UPDATE_PRODUCT_ERROR,
    payload: error,
  };
};

const getProductRequest = () => {
  return {
    type: ACTIONS.GET_PRODUCT_REQUEST,
    payload: {},
  };
};

const getProductSuccess = (results) => {
  return {
    type: ACTIONS.GET_PRODUCT_SUCCESS,
    payload: {
      product: results,
    },
  };
};

const getProductError = (error) => {
  return {
    type: ACTIONS.GET_PRODUCT_ERROR,
    payload: error,
  };
};

const deleteProductRequest = () => {
  return {
    type: ACTIONS.DELETE_PRODUCT_REQUEST,
    payload: {},
  };
};

const deleteProductSuccess = () => {
  return {
    type: ACTIONS.DELETE_PRODUCT_SUCCESS,
    payload: {},
  };
};

const deleteProductError = (error) => {
  return {
    type: ACTIONS.DELETE_PRODUCT_ERROR,
    payload: error,
  };
};
