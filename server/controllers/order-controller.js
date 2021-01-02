import { get } from 'lodash';
import OrderBLI from '@bli/order-bli';
import AuthHelper from '@helpers/auth-helper';
import UserModel from '@models/user';

import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';

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

        if (id) {
          const order = await orderBli.getOrderByOrderId(id, sid);
          res.send(order);
        } else {
          // If no id was found this is will get all orders.
          if (!AuthHelper.isAuthenticatedAdmin(req)) {
            throw new EXCEPTIONS.apiError(EXCEPTIONS.unauthorized, 401);
          }

          const user = new UserModel();
          user.buildUserModel(req.user);
          const orders = await orderBli.getOrders(user);
          res.send(orders);
        }

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
    return;
  }
}
