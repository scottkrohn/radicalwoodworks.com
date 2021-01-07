import { get } from 'lodash';
import OrderBLI from '@bli/order-bli';
import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';
import AUTH from '@constants/auth-constants';

export default async function (req, res, next) {
  const orderBli = new OrderBLI();
  const cartId = get(req, 'body.cartId', null);
  const userId = get(req, 'body.userId', null);
  const cookieOrderId = get(req, 'cookies.orderId', null);
  const sid = get(req, 'cookies.sid', null);
  const orderId = req.params.orderId;

  try {
    if (req.method === REQUEST.method.post) {
      try {
        const order = await orderBli.createOrUpdateOrder(cartId, userId, sid);
        res.send(order);
      } catch (error) {
        if (error.status) {
          res.status(error.status || 500).send(error);
          return;
        }
        throw error;
      }
    } else if (req.method === REQUEST.method.get) {
      try {
        const id = orderId || cookieOrderId;
        const isAdmin = req?.user?.type === AUTH.USER_TYPES.ADMIN;
        const order = await orderBli.getOrderByOrderId(id, sid, isAdmin);
        res.send(order);
      } catch (error) {
        if (error.status) {
          res.status(error.status).send(error);
          return;
        }

        throw error;
      }
    } else if (req.method === REQUEST.method.put) {
      // TODO: Move this to the checkout controllrt
      try {
        const updatedOrder = await orderBli.updateOrder(orderId, req.body);
        res.send(updatedOrder);
      } catch (error) {
        if (error.status) {
          res.status(error.status).send(error);
          return;
        }
      }
    }
  } catch (error) {
    res.status(500).send(EXCEPTIONS.internalError);
    return;
  }
}
