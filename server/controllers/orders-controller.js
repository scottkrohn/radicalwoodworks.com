import REQUEST from '@constants-server/request-constants';
import EXCEPTIONS from '@constants/exceptions';
import OrderBLI from '@bli/order-bli';
import AuthHelper from '@helpers/auth-helper';
import UserModel from '@models/user';

export default async function (req, res, next) {
  const orderBli = new OrderBLI();

  try {
    if (req.method === REQUEST.method.get) {
      if (!req.isAuthenticated()) {
        throw new EXCEPTIONS.apiError(EXCEPTIONS.unauthorized, 401);
      }

      try {
        if (AuthHelper.isAuthenticatedAdmin(req)) {
          const user = new UserModel();
          user.buildUserModel(req.user);
          const orders = await orderBli.getOrders(user);
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
    res.status(500).send(EXCEPTIONS.internalError);
    return;
  }
}
