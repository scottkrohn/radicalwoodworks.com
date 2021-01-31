import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';
import OrderBLI from '@bli/order-bli';
import AuthHelper from '@helpers/auth-helper';
import UserModel from '@models/user';
import { get } from 'lodash';

export default async function (req, res, next) {
  const orderBli = new OrderBLI();

  try {
    if (!req.isAuthenticated()) {
      console.log('blarg');
      throw new EXCEPTIONS.apiError(EXCEPTIONS.unauthorized, 401);
    }

    if (req.path === '/orders/count' && req.method === REQUEST.method.get) {
      const orderStatuses = get(req, 'query.orderStatuses', '')
        .split(',')
        .filter((elem) => elem);
      const count = await orderBli.getOrdersCount(orderStatuses);
      res.send({ count, orderStatuses });
    } else if (req.method === REQUEST.method.get) {
      try {
        if (AuthHelper.isAuthenticatedAdmin(req)) {
          const { limit, offset, sort } = req.query;
          const user = new UserModel();
          user.buildUserModel(req.user);
          const orders = await orderBli.getOrders(user, limit, offset, sort);
          res.send(orders);
        } else {
          // TODO: load orders for regular user
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
    res.status(500).send(error || EXCEPTIONS.internalError);
    return;
  }
}
