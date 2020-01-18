import React from 'react';
import cx from 'classnames';

import styles from './carousel-dots.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const CarouselDots = ({ className, count, currentIndex, onClick }) => {
  useStyles(styles);

  const handleClick = (index) => () => {
    onClick(index);
  };

  return (
    <div className={cx(styles.CarouselDotsContainer, className, 'flex justify-content-center')}>
      {[...Array(count)].map((element, index) => {
        return (
          <div
            key={index}
            className={cx(styles.Dot, currentIndex === index && styles.Active)}
            onClick={handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default CarouselDots;
