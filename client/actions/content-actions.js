import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getAllContent = (category) => {
    return (dispatch) => {
        dispatch(getContentRequest());

        axios.get(`/server/content/content/${category}`)
            .then((response) => {
                console.log(response);
                dispatch(getContentSuccess(response));
            })
            .catch((error) => {
                dispatch(getContentError(error));
            });
    }
}

/*******************/
/* Action Creators */
/*******************/

const getContentRequest = () => {
    return {
        type: ACTIONS.GET_CONTENT_REQUEST,
        payload: {},
    };
}

const getContentSuccess = (results) => {
    return {
        type:ACTIONS.GET_CONTENT_SUCCESS,
        payload: results,
    };
}

const getContentError = (error) => {
    return {
        type: ACTIONS.GET_CONTENT_ERROR,
        payload: error,
    };
}