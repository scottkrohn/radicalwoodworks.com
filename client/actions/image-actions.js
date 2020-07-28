import axios from 'axios';
import ACTIONS from 'client/constants/action-constants';

export const deleteImage = (imageId) => {
  return (dispatch) => {
    dispatch(deleteImageRequest());

    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/images/${imageId}`)
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

export const updateProductImageMapping = (imageId, data) => {
  return (dispatch) => {
    dispatch(imageMappingRequest());

    return new Promise((resolve, reject) => {
      axios
        .put(`/api/images/${imageId}`, data)
        .then((response) => {
          dispatch(imageMappingSuccess());
          resolve();
        })
        .catch((error) => {
          dispatch(imageMappingError());
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

const imageMappingRequest = () => {
  return {
    type: ACTIONS.UPDATE_IMAGE_MAPPING_REQUEST,
    payload: {
      loading: true,
      error: false,
    },
  };
};

const imageMappingSuccess = () => {
  return {
    type: ACTIONS.UPDATE_IMAGE_MAPPING_SUCCESS,
    payload: {
      loading: false,
      error: false,
    },
  };
};

const imageMappingError = () => {
  return {
    type: ACTIONS.UPDATE_IMAGE_MAPPING_ERROR,
    payload: {
      loading: false,
      error: true,
    },
  };
};
