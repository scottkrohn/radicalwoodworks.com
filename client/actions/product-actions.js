import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getProduct = (productId) => {
    return (dispatch) => {
        dispatch(getProductRequest());

        axios
            .get(`/server/products/${productId}`)
            .then((response) => {
                dispatch(getProductSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getProductError(error));
            });
    };
};

export const deleteProduct = (productId) => {
    return (dispatch) => {
        dispatch(deleteProductRequest());

        return new Promise((resolve, reject) => {
            axios.delete(`/server/products/${productId}`)
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

/*******************/
/* Action Creators */
/*******************/

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
