import { get } from 'lodash';
import CartBLI from '@bli/cart';

import REQUEST from '@constants-server/request-constants';

export default (req, res, next) => {
  const cartBli = new CartBLI();
  const cartId = req.params.cartId;

  if (req.method === REQUEST.method.get) {
    if (cartId) {
      cartBli.getCartById(cartId).then((result) => {
        res.send(result);
      });
    }
  } else if (req.method === REQUEST.method.post) {
    const customerId = get(req, 'body.customerId', null);
    const items = get(req, 'body.items', []);
    cartBli.createCart(customerId, items).then((cart) => {
      res.send(cart);
    });
  }
};
