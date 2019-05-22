
import ACTIONS from 'constants/action-constants';
import Product from 'model/product';

const initialState = {
    loading: true,
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case ACTIONS.GET_PRODUCT_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
        };
    case ACTIONS.GET_PRODUCT_SUCCESS:
        return {
            ...state,
            ...payload,
            loading: false,
            error: false,
        };
    case ACTIONS.GET_PRODUCT_ERROR:
        return {
            ...state,
            loading: false,
            error: true,
        };
    default:
        return state;
    }
};

export default productReducer;
