// Constants
import ACTIONS from 'constants/action-constants';

export const getAllContent = (category) => {
  return (dispatch, getState, axios) => {
    dispatch(clearContent());
    dispatch(getContentRequest());

    return new Promise((resolve, reject) => {
      axios
        .get(`/api/content/${category}`)
        .then((response) => {
          dispatch(getContentSuccess(response.data, category));
          resolve();
        })
        .catch((error) => {
          dispatch(getContentError(error));
          reject();
        });
    });
  };
};

export const updateContent = (content) => {
  return (dispatch, getState, axios) => {
    dispatch(updateContentRequest());

    return new Promise((resolve, reject) => {
      axios
        .put('/api/content/update', content.getValues())
        .then((response) => {
          if (response.status === 200) {
            dispatch(updateContentSuccess());
            resolve();
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          dispatch(updateContentError(error));
          reject();
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

const getContentSuccess = (results, type) => {
  return {
    type: ACTIONS.GET_CONTENT_SUCCESS,
    payload: {
      content: results,
      type,
    },
  };
};

const getContentError = (error) => {
  return {
    type: ACTIONS.GET_CONTENT_ERROR,
    payload: error,
  };
};

const updateContentRequest = () => {
  return {
    type: ACTIONS.UPDATE_CONTENT_REQUEST,
    payload: {},
  };
};

const updateContentSuccess = () => {
  return {
    type: ACTIONS.UPDATE_CONTENT_SUCCESS,
    payload: {},
  };
};

const updateContentError = (error) => {
  return {
    type: ACTIONS.UPDATE_CONTENT_ERROR,
    payload: error,
  };
};

const clearContent = () => {
  return {
    type: ACTIONS.CLEAR_CONTENT,
    payload: {
      content: [],
    },
  };
};
