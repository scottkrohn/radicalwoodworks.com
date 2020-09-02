import { get } from 'lodash';
import CustomerBLI from '@bli/address-bli';
import EXCEPTIONS from '@constants/exceptions';
import REQUEST from '@constants-server/request-constants';

export default async function (req, res, next) {
  const customerBli = new CustomerBLI();
  const orderId = req.params.orderId;

  try {
    if (req.method === REQUEST.method.post) {
      const order = await customerBli.createOrUpdateAddress(req.body, orderId);
      res.send(order);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error);
    return;
  }
}
