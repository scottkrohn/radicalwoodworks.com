import ACTIONS from 'constants/action-constants';

const initialState = {
  uploading: false,
  error: false,
};

const imageUploadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.UPLOAD_IMAGE_REQUEST:
    case ACTIONS.UPLOAD_IMAGE_ERROR:
    case ACTIONS.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default imageUploadReducer;
