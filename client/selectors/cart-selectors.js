import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import Cart from '@models/cart';

const getCartFromState = (state) => state.cart.cart;
export const getLoading = (state) => state.cart.loading;

export const selectCart = createSelector([getCartFromState], (cartData) => {
  if (isEmpty(cartData)) {
    return null;
  }

  const cartModel = new Cart();
  cartModel.buildCartModel(cartData.data, cartData.children);

  return cartModel;
});

export const selectItemCount = createSelector([selectCart], (cartModel) => {
  if (!cartModel || !cartModel.getItems) {
    return 0;
  }

  const cartItems = cartModel.getItems() || [];
  const itemCount = cartItems.reduce((itemCount, item) => {
    return itemCount + item.getQuantity();
  }, 0);

  return itemCount;
});
