import React from 'react';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './carousel-nav-button.module.scss';


const CarouselNavButton = ({ className, onClick, direction }) => {
  
  return (
    <div
      onClick={onClick}
      className={cx(styles.CarouselNavButtonContainer, className)}
    >
      <FontAwesomeIcon
        className={styles.CloseIcon}
        icon={direction === 'left' ? faArrowCircleLeft : faArrowCircleRight}
      />
    </div>
  );
};

export default CarouselNavButton;
