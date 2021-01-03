import { isEmpty } from 'lodash';
import Order from '@models/order';
import { createSelector } from 'reselect';

const getOrdersFromState = (state) => state.orders.orders;
export const getLoading = (state) => state.orders.loading;

export const selectOrders = createSelector(
  [getOrdersFromState],
  (ordersData) => {
    if (isEmpty(ordersData)) {
      return null;
    }

    const orderModels = [];
    ordersData.forEach((orderData) => {
      const order = new Order();
      order.buildOrderModel(orderData.data, orderData.children);
      orderModels.push(order);
    });

    return orderModels;
  }
);
