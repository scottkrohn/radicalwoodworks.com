import React from 'react';
import cx from 'classnames';

import styles from './table-row.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TableRow = ({ className, children, head, onRowClick }) => {
  useStyles(styles);
  const RowType = head ? 'th' : 'td';

  return (
    <tr
      className={cx(styles.TableRowContainer, className)}
      onClick={() => {
        onRowClick && onRowClick();
      }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => <RowType key={index}>{child}</RowType>)
      ) : (
        <RowType>{children}</RowType>
      )}
    </tr>
  );
};

export default TableRow;
