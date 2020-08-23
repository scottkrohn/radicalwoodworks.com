import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import Order from '@models/order';

const getOrderFromState = (state) => state.order.order;
export const getLoading = (state) => state.order.loading;

export const selectOrder = createSelector([getOrderFromState], (orderData) => {
  if (isEmpty(orderData)) {
    return null;
  }

  const orderModel = new Order();
  orderModel.buildOrderModel(orderData.data, orderData.children);

  return orderModel;
});
