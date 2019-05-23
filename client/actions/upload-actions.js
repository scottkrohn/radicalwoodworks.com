import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';
import { Route53Resolver } from 'node_modules/aws-sdk/index';

export const uploadImage = (file, productId) => {
  return (dispatch) => {
    dispatch(uploadImageRequest());

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios({
        url: `/server/products/image/${productId}`,
        method: 'post',
        config,
        data: formData,
      })
        .then((result) => {
          dispatch(uploadImageSuccess());
          resolve(result.data);
        })
        .catch((error) => {
          // TODO: something with the error
          dispatch(uploadImageError());
        });
    });
  };
};

/*******************/
/* Action Creators */
/*******************/

const uploadImageRequest = () => {
  return {
    type: ACTIONS.UPLOAD_IMAGE_REQUEST,
    payload: {
      uploading: true,
      error: false,
    },
  };
};

const uploadImageSuccess = () => {
  return {
    type: ACTIONS.UPLOAD_IMAGE_SUCCESS,
    payload: {
      uploading: false,
      error: false,
    },
  };
};

const uploadImageError = () => {
  return {
    type: ACTIONS.UPLOAD_IMAGE_ERROR,
    payload: {
      uploading: false,
      error: true,
    },
  };
};
