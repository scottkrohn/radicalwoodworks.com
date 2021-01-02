const ACTIONS = {
  // Products Actions
  GET_PRODUCTS_REQUEST: 'products:getProductsRequest',
  GET_PRODUCTS_SUCCESS: 'products:getProductsSuccess',
  GET_PRODUCTS_ERROR: 'products:getProductsError',

  // Product Actions
  GET_PRODUCT_REQUEST: 'product:getProductRequest',
  GET_PRODUCT_SUCCESS: 'product:getProductSuccess',
  GET_PRODUCT_ERROR: 'product:getProductError',

  UPDATE_PRODUCT_REQUEST: 'product:updateProductRequest',
  UPDATE_PRODUCT_SUCCESS: 'product:updateProductSuccess',
  UPDATE_PRODUCT_ERROR: 'product:updateProductError',

  CREATE_PRODUCT_REQUEST: 'product:createProductRequest',
  CREATE_PRODUCT_SUCCESS: 'product:createProductSuccess',
  CREATE_PRODUCT_ERROR: 'product:createProductError',

  DELETE_PRODUCT_REQUEST: 'product:deleteProductRequest',
  DELETE_PRODUCT_SUCCESS: 'product:deleteProductSuccess',
  DELETE_PRODUCT_ERROR: 'product:deleteProductError',

  CLEAR_PRODUCT_REQUEST: 'product:clearProductRequest',

  // Content Actions
  GET_CONTENT_REQUEST: 'content:getContentRequest',
  GET_CONTENT_SUCCESS: 'content:getContentSuccess',
  GET_CONTENT_ERROR: 'content:getContentError',
  CLEAR_CONTENT: 'content:clearContent',

  UPDATE_CONTENT_REQUEST: 'content:updateContentRequest',
  UPDATE_CONTENT_SUCCESS: 'content:updateContentSuccess',
  UPDATE_CONTENT_ERROR: 'content:updateContentError',

  // Contact Actions
  SEND_CONTACT_REQUEST: 'contact:sendContactRequest',
  SEND_CONTACT_SUCCESS: 'contact:sendContactSuccess',
  SEND_CONTACT_ERROR: 'contact:sendContactError',

  // Login Actions
  SEND_LOGIN_REQUEST: 'login:sendLoginRequest',
  SEND_LOGIN_SUCCESS: 'login:sendLoginSuccess',
  SEND_LOGIN_ERROR: 'login:sendLoginError',

  VERIFY_LOGIN_REQUEST: 'verify:verifyLoginRequest',
  VERIFY_LOGIN_SUCCESS: 'verify:verifyLoginSuccess',
  VERIFY_LOGIN_ERROR: 'verify:verifyLoginError',

  // Logout Actions
  SEND_LOGOUT_REQUEST: 'logout:sendLogoutRequest',
  SEND_LOGOUT_SUCCESS: 'logout:sendLogoutSuccess',
  SEND_LOGOUT_ERROR: 'logout:sendLogoutError',

  // Auth Actions
  SEND_AUTH_REQUEST: 'auth:sendAuthRequest',
  SEND_AUTH_SUCCESS: 'auth:sendAuthSuccess',
  SEND_AUTH_ERROR: 'auth:sendAuthError',

  // Image Actions
  UPLOAD_IMAGE_REQUEST: 'image:uploadImageRequest',
  UPLOAD_IMAGE_SUCCESS: 'image:uploadImageSuccess',
  UPLOAD_IMAGE_ERROR: 'image:uploadImageError',

  DELETE_IMAGE_REQUEST: 'image:deleteImageRequest',
  DELETE_IMAGE_SUCCESS: 'image:deleteImageSuccess',
  DELETE_IMAGE_ERROR: 'image:deleteImageError',

  UPDATE_IMAGE_MAPPING_REQUEST: 'image:imageMappingRequest',
  UPDATE_IMAGE_MAPPING_SUCCESS: 'image:imageMappingSuccess',
  UPDATE_IMAGE_MAPPING_ERROR: 'image:imageMappingError',

  // Cart Actions
  ADD_OR_UPDATE_CART_ITEM_REQUEST: 'cart:addOrUpdateCartItemRequest',
  ADD_OR_UPDATE_CART_ITEM_SUCCESS: 'cart:addOrUpdateCartItemSuccess',
  ADD_OR_UPDATE_CART_ITEM_ERROR: 'cart:addOrUpdateCartItemError',

  CREATE_CART_REQUEST: 'cart:createCartRequest',
  CREATE_CART_SUCCESS: 'cart:createCartSuccess',
  CREATE_CART_ERROR: 'cart:createCartError',

  GET_CART_REQUEST: 'cart:getCartRequest',
  GET_CART_SUCCESS: 'cart:getCartSuccess',
  GET_CART_ERROR: 'cart:getCartError',

  CLEAR_CART_REQUEST: 'cart:clearCartRequest',
  CLEAR_CART_SUCCESS: 'cart:clearCartSuccess',
  CLEAR_CART_ERROR: 'cart:clearCartError',

  // Order Actions
  CREATE_OR_UPDATE_ORDER_REQUEST: 'order:createOrUpdateOrderRequest',
  CREATE_OR_UPDATE_ORDER_SUCCESS: 'order:createOrUpdateOrderSuccess',
  CREATE_OR_UPDATE_ORDER_ERROR: 'order:createOrUpdateOrderError',

  GET_ORDER_REQUEST: 'order:getOrderRequest',
  GET_ORDER_SUCCESS: 'order:getOrderSuccess',
  GET_ORDER_ERROR: 'order:getOrderRequestError',

  GET_ORDERS_REQUEST: 'order:getOrdersRequest',
  GET_ORDERS_SUCCESS: 'order:getOrdersSuccess',
  GET_ORDERS_ERROR: 'order:getOrdersERROR',

  // User Actions
  CREATE_USER_ACCOUNT_REQUEST: 'user:createUserAccountRequest',
  CREATE_USER_ACCOUNT_SUCCESS: 'user:createUserAccountSuccess',
  CREATE_USER_ACCOUNT_ERROR: 'user:createUserAccountError',

  UPDATE_USER_REQUEST: 'user:updateAccountRequest',
  UPDATE_USER_SUCCESS: 'user:updateAccountSuccess',
  UPDATE_USER_ERROR: 'user:updateAccountError',

  UPDATE_PASSWORD_REQUEST: 'user:updatePasswordRequest',
  UPDATE_PASSWORD_SUCCESS: 'user:updatePasswordSuccess',
  UPDATE_PASSWORD_ERROR: 'user:updatePasswordError',
};

export default ACTIONS;
