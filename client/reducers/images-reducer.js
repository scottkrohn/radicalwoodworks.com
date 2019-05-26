import ACTIONS from 'client/constants/action-constants';

const initialState = {
  loading: false,
  error: false,
};

const imagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.DELETE_IMAGE_REQUEST:
    case ACTIONS.DELETE_IMAGE_SUCCESS:
    case ACTIONS.DELETE_IMAGE_ERROR:
    case ACTIONS.PRIMARY_IMAGE_REQUEST:
    case ACTIONS.PRIMARY_IMAGE_SUCCESS:
    case ACTIONS.PRIMARY_IMAGE_ERROR:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default imagesReducer;