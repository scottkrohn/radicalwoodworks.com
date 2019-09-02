import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import useOutsideClickHandler from '../../utils/hooks/useOutsideClickHandler';

import styles from './drawer.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
      {typeof children === 'function' ? (
        <div>
          {typeof hide === 'function' && (
            <div
              className={styles.CloseLink}
              onClick={hide}
            >
              <FontAwesomeIcon
                className={styles.CloseIcon}
                icon={faTimes}
              />
            </div>
          )}
          {children({ hide })}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Drawer;
