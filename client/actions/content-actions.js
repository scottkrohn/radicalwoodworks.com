import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getAllContent = (category) => {
    return (dispatch) => {
        dispatch(getContentRequest());

        return new Promise((resolve, reject) => {
            axios.get(`/server/content/content/${category}`)
                .then((response) => {
                    dispatch(getContentSuccess(response));
                    resolve();
                })
                .catch((error) => {
                    dispatch(getContentError(error));
                    reject()
                });
        });
    };
};

/*******************/
/* Action Creators */
/*******************/

const getContentRequest = () => {
    return {
        type: ACTIONS.GET_CONTENT_REQUEST,
        payload: {},
    };
};

const getContentSuccess = (results) => {
    return {
        type: ACTIONS.GET_CONTENT_SUCCESS,
        payload: {
            content: results,
        },
    };
};

const getContentError = (error) => {
    return {
        type: ACTIONS.GET_CONTENT_ERROR,
        payload: error,
    };
};
