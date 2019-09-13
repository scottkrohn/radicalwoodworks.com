import React from 'react';
import cx from 'classnames';

import styles from './table-cell.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TableCell = ({ align = 'left', className, children }) => {
  useStyles(styles);
  const tableCellStyles = cx({
    [className]: this,
    [styles.TableCellContainer]: true,
    ['justify-content-start']: align === 'left',
    ['justify-content-center']: align === 'center',
    ['justify-content-end']: align === 'right',
  });

  return <div className={tableCellStyles}>{children}</div> || null;
};

export default TableCell;
