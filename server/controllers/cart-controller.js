import { get } from 'lodash';
import CartBLI from '@bli/cart';

import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default async function (req, res, next) {
  const cartBli = new CartBLI();
  const cartId = req.params.cartId;
  const cid = req.query.cid;
  const cookieCartId = get(req, 'cookies.cartId', null);
  const includeProducts =
    get(req, 'query.includeProducts', '').toLowerCase() === 'true';

  try {
    if (req.method === REQUEST.method.get) {
      if (cartId) {
        const cart = await cartBli.getCartById(cartId, includeProducts);
        res.send(cart);
      } else if (cid) {
        const cart = await cartBli.getCartByCustomerId(cid, includeProducts);
        res.send(cart);
      } else if (cookieCartId) {
        const cart = await cartBli.getCartById(cookieCartId, includeProducts);
        res.send(cart);
      } else {
        res.send(null);
      }
    } else if (req.method === REQUEST.method.post) {
      const customerId = get(req, 'body.customerId', null);
      const items = get(req, 'body.items', []);
      const cart = await cartBli.createCart(customerId, items);
      res.send(cart);
    } else if (req.method === REQUEST.method.put) {
      let cart = await cartBli.getCartById(cartId, true, false);
      const items = get(req, 'body.items', []);

      try {
        await cartBli.addOrUpdateCartItems(cart, items);
        cart = await cartBli.getCartById(cartId, true, true);
        res.send(cart);
      } catch (error) {
        res.status(error.status).send(error);
        return;
      }
    } else if (req.method === REQUEST.method.delete) {
      if (!cartId) {
        res.status(400).send(EXCEPTIONS.missingCartId);
      }

      try {
        const cart = await cartBli.clearCart(cartId);
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
