import React from 'react';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import styles from './missing-image.scss';


const MissingImage = ({ className, message }) => {
  
  return (
    <div className={cx(className, styles.MissingImageContainer)}>
      <FontAwesomeIcon
        className={styles.HamburgerIcon}
        icon={faImage}
      />
      {message && <span className={styles.Message}>{message}</span>}
    </div>
  );
};

export default MissingImage;
