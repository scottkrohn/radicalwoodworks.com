import React, { useEffect } from 'react';
import cx from 'classnames';

import styles from './drawer.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

// TODO: Handle click outside of the drawer and close it!

const Drawer = ({ children, hide, showing }) => {
  useStyles(styles);

  const drawerClasses = cx({
    [styles.DrawerContainer]: true,
    [styles.Showing]: showing,
  });

  return <div className={drawerClasses}>{typeof children === 'function' ? children({ hide }) : children}</div>;
};

export default Drawer;
