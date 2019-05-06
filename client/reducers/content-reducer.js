
import ACTIONS from 'constants/action-constants';

const initialState = {
    loading: true,
    error: false,
};

const contentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case ACTIONS.GET_CONTENT_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
        };
    case ACTIONS.GET_CONTENT_SUCCESS:
        return {
            ...state,
            ...payload,
            loading: false,
            error: false,
        };
    case ACTIONS.GET_CONTENT_ERROR:
        return {
            ...state,
            loading: false,
            error: true,
        };
    default:
        return state;
    }
};

export default contentReducer;
