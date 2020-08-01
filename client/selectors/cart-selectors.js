import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Cart from '@model/cart';
import CartItem from '@model/cart-item';

const getCartFromState = (state) => state.cart.cart;
export const getLoading = (state) => state.cart.loading;

export const getCart = createSelector([getCartFromState], (cartData) => {
  let cartModel = {};

  if (!isEmpty(cartData)) {
    const cart = new Cart();
    cart.setValues(cartData.data);

    const items = get(cartData, 'children.items');
    if (items) {
      const itemModels = [];
      for (const item of items) {
        const itemModel = new CartItem();
        itemModel.setValues(item.data);
        itemModels.push(itemModel);
      }

      cart.setItems(itemModels);
    }

    cartModel = cart;
  }

  return cartModel;
});
