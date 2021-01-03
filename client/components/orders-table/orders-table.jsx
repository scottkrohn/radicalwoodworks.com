import React from 'react';
import Table from '@components/table/table';
import TableHead from '@components/table/table-head';
import TableBody from '@components/table/table-body';
import TableRow from '@components/table/table-row';
import TableCell from '@components/table/table-cell';
import OrdersTableRow from '@components/orders-table/orders-table-row';

const OrdersTable = ({ orders }) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <span>Order #</span>
            </TableCell>
            <TableCell>
              <span>Name</span>
            </TableCell>
            <TableCell>
              <span>Subtotal</span>
            </TableCell>
            <TableCell>
              <span>Shipping</span>
            </TableCell>
            <TableCell>
              <span>Grand Total</span>
            </TableCell>
            <TableCell>
              <span>Status</span>
            </TableCell>
            <TableCell>
              <span>Shipping Status</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return <OrdersTableRow order={order} key={order.getId()} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
