import { get } from 'lodash';
import CartBLI from '@bli/cart-bli';

import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default async function (req, res, next) {
  const cartBli = new CartBLI();
  const cartId = req.params.cartId;
  const cid = req.query.cid;
  const cookieCartId = get(req, 'cookies.cartId', null);
  const sid = get(req, 'cookies.sid', null);
  const includeProducts =
    get(req, 'query.includeProducts', '').toLowerCase() === 'true';

  try {
    if (req.method === REQUEST.method.get) {
      if (cartId) {
        const cart = await cartBli.getCartById(
          cartId,
          includeProducts,
          true,
          sid
        );

        res.send(cart);
      } else if (cid) {
        const cart = await cartBli.getCartByCustomerId(
          cid,
          includeProducts,
          true,
          sid
        );

        res.send(cart);
      } else if (cookieCartId) {
        const cart = await cartBli.getCartById(
          cookieCartId,
          includeProducts,
          true,
          sid
        );

        res.send(cart);
      } else {
        res.send(null);
      }
    } else if (req.method === REQUEST.method.post) {
      const userId = get(req, 'body.userId', null);
      const items = get(req, 'body.items', []);
      const cart = await cartBli.createCart(userId, items, sid);
      res.send(cart);
    } else if (req.method === REQUEST.method.put) {
      let cart = await cartBli.getCartById(cartId, true, false, sid);
      const items = get(req, 'body.items', []);
      if (!cart) {
        res.status(400).send(EXCEPTIONS.cartNotFound);
        return;
      }

      try {
        await cartBli.addOrUpdateCartItems(cart, items);
        cart = await cartBli.getCartById(cartId, true, true, sid);
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
        const cart = await cartBli.clearCart(cartId, sid);
        res.send(cart);
      } catch (error) {
        res.status(error.status).send(error);
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(EXCEPTIONS.internalError);
  }
}
