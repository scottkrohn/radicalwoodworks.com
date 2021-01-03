import React from 'react';
import TableRow from '@components/table/table-row';
import TableCell from '@components/table/table-cell';

const OrdersTableRow = ({ order }) => {
  return (
    <TableRow>
      <TableCell>
        <span>{order.getId()}</span>
      </TableCell>
      <TableCell>
        <span>Name Here</span>
      </TableCell>
      <TableCell>
        <span>{order.getSubtotal()}</span>
      </TableCell>
      <TableCell>
        <span>{order.getShippingTotal()}</span>
      </TableCell>
      <TableCell>
        <span>{order.getGrandTotal()}</span>
      </TableCell>
      <TableCell>
        <span>{order.getStatus()}</span>
      </TableCell>
      <TableCell>
        <span>{order.getFulfillmentStatus() || 'N/A'}</span>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
