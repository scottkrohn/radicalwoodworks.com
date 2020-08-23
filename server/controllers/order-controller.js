import { get } from 'lodash';
import OrderBLI from '@bli/order-bli';

import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default async function (req, res, next) {
  const orderBli = new OrderBLI();
  const cartId = get(req, 'body.cartId', null);
  const customerId = get(req, 'body.customerId', null);
  const cookieOrderId = get(req, 'cookies.orderId', null);

  try {
    if (req.method === REQUEST.method.post) {
      try {
        const order = await orderBli.createOrUpdateOrder(cartId);
        res.send(order);
      } catch (error) {
        if (error.status) {
          res.status(error.status || 500).send(error);
          return;
        }
        throw error;
      }
    } else if (req.method === REQUEST.method.get) {
      // TODO: handle when the order ID is passed thru the path
      // TODO: handle throwing an error if the order is not found.
      try {
        const order = await orderBli.getOrderByOrderId(cookieOrderId);
        res.send(order);
      } catch (error) {
        if (error.status) {
          res.status(error.status).send(error);
          return;
        }

        throw error;
      }
    }
  } catch (error) {
    res.status(500).send(EXCEPTIONS.internalError);
  }
}
