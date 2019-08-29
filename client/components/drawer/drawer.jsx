import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import useOutsideClickHandler from '../../utils/hooks/useOutsideClickHandler';

import styles from './drawer.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Drawer = ({ children, hide, showing }) => {
  const drawerRef = useRef(null);

  useOutsideClickHandler(drawerRef, hide);
  useStyles(styles);

  const drawerClasses = cx({
    [styles.DrawerContainer]: true,
    [styles.Showing]: showing,
  });

  return (
    <div
      ref={drawerRef}
      className={drawerClasses}
    >
      {typeof children === 'function' ? children({ hide }) : children}
    </div>
  );
};

export default Drawer;
