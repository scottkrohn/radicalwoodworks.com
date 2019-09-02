import React, { useEffect } from 'react';
import cx from 'classNames';

import Button from '../button/button';

import styles from './notification.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Notification = ({ actionLabel, header, message, onAction, showing, hide, timeout = 5000 }) => {
  useStyles(styles);

  useEffect(() => {
    if (showing) {
      setTimeout(hide, timeout);
    }
  }, [showing]);

  return showing ? (
    <div className={cx(styles.NotificationContainer, showing && styles.AnimateShow)}>
      <div className={cx(styles.HeaderContainer, 'flex', 'justify-content-between')}>
        <span className={styles.HeaderText}>{header}</span>
        <span
          onClick={hide}
          className={styles.CloseButton}
        >
          Close
        </span>
      </div>
      <div className={styles.Message}>{message}</div>
      {actionLabel && typeof onAction === 'function' && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  ) : null;
};

export default Notification;
