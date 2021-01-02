import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import Order from '@models/order';

const getOrderFromState = (state) => state.order.order;
const getOrdersFromState = (state) => state.orders.orders;
export const getLoading = (state) => state.order.loading;

export const selectOrder = createSelector([getOrderFromState], (orderData) => {
  if (isEmpty(orderData)) {
    return null;
  }

  const orderModel = new Order();
  orderModel.buildOrderModel(orderData.data, orderData.children);

  return orderModel;
});

export const selectOrders = createSelector([getOrdersFromState], (ordersData) => {
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
});
