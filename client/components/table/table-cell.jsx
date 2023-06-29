import React from 'react';
import cx from 'classnames';

import styles from './table-cell.scss';


const TableCell = ({ align = 'left', className, children }) => {
  
  const tableCellStyles = cx({
    [className]: true,
    [styles.TableCellContainer]: true,
    ['justify-content-start']: align === 'left',
    ['justify-content-center']: align === 'center',
    ['justify-content-end']: align === 'right',
  });

  return <div className={tableCellStyles}>{children}</div> || null;
};

export default TableCell;
