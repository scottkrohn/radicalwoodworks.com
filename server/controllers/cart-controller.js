import { get } from 'lodash';
import CartBLI from '@bli/cart';

import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default async function (req, res, next) {
  const cartBli = new CartBLI();
  const cartId = req.params.cartId;
  const cid = req.query.cid;

  try {
    if (req.method === REQUEST.method.get) {
      if (cartId) {
        const cart = await cartBli.getCartById(cartId);
        res.send(cart);
      } else if (cid) {
        const cart = await cartBli.getCartByCustomerId(cid);
        res.send(cart);
      } else {
        res.status(400).send(EXCEPTIONS.apiError(EXCEPTIONS.cartNotFound, 400));
      }
    } else if (req.method === REQUEST.method.post) {
      const customerId = get(req, 'body.customerId', null);
      const items = get(req, 'body.items', []);
      const cart = await cartBli.createCart(customerId, items);
      res.send(cart);
    } else if (req.method === REQUEST.method.put) {
      let cart = await cartBli.getCartById(cartId);
      const items = get(req, 'body.items', []);

      try {
        await cartBli.addOrUpdateCartItems(cart, items);
        cart = await cartBli.getCartById(cartId);
        res.send(cart);
      } catch (error) {
        res.status(error.status).send(error);
        return;
      }
    }
  } catch (error) {
    res.status(500).send(EXCEPTIONS.internalError);
  }
}
