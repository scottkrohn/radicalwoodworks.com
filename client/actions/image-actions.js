import axios from 'axios';
import ACTIONS from 'client/constants/action-constants';

export const deleteImage = (imageId) => {
  return (dispatch) => {
    dispatch(deleteImageRequest());

    return new Promise((resolve, reject) => {

      axios.delete(`/server/images/${imageId}`)
        .then((result) => {
          dispatch(deleteImageSuccess());
          resolve();
        })
        .catch((error) => {
          dispatch(deleteImageError());
          reject();
        });
    });
  };
};

const deleteImageRequest = () => {
  return {
    type: ACTIONS.DELETE_IMAGE_REQUEST,
    payload: {
      loading: true,
      error: false,
    },
  };
};

const deleteImageSuccess = () => {
  return {
    type: ACTIONS.DELETE_IMAGE_SUCCESS,
    payload: {
      loading: false,
      error: false,
    },
  };
};

const deleteImageError = () => {
  return {
    type: ACTIONS.DELETE_IMAGE_ERROR,
    payload: {
      loading: false,
      error: true,
    },
  };
};