import React from 'react';
import TableRow from '@components/table/table-row';
import TableCell from '@components/table/table-cell';
import CurrencyHelper from '@helpers/currency-helper';

const OrdersTableRow = ({ order, onRowClick }) => {
  return (
    <TableRow onRowClick={onRowClick}>
      <TableCell>
        <span>{order.getId()}</span>
      </TableCell>
      <TableCell>
        <span>Name Here</span>
      </TableCell>
      <TableCell>
        <span>{CurrencyHelper.formatCurrency(order.getSubtotal())}</span>
      </TableCell>
      <TableCell>
        <span>{CurrencyHelper.formatCurrency(order.getShippingTotal())}</span>
      </TableCell>
      <TableCell>
        <span>{CurrencyHelper.formatCurrency(order.getGrandTotal())}</span>
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
