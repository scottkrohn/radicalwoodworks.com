import React, { useRef } from 'react';
import cx from 'classnames';
import useOutsideClickHandler from '../../utils/hooks/useOutsideClickHandler';

import styles from './drawer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Drawer = ({ children, className, hide, showing }) => {
  const drawerRef = useRef(null);

  useOutsideClickHandler(drawerRef, hide);

  const drawerClasses = cx({
    [styles.DrawerContainer]: true,
    [styles.Showing]: showing,
    [className]: className,
  });

  return showing ? (
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
  ) : null;
};

export default Drawer;
