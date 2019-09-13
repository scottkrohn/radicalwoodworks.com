import React from 'react';

const TableRow = ({ className, children, head }) => {
  const RowType = head ? 'th' : 'td';

  return (
    <tr>
      {Array.isArray(children) ? (
        children.map((child, index) => <RowType key={index}>{child}</RowType>)
      ) : (
        <RowType>{children}</RowType>
      )}
    </tr>
  );
};

export default TableRow;
