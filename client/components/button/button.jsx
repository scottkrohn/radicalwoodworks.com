import React from 'react';
import cx from 'classnames';

import styles from './button.module.scss';

const Button = ({ className, children, danger, dark, halfWidth, fullWidth, onClick, primary, save }) => {

  const buttonContainerStyles = cx({
    [styles.ButtonContainer]: true,
    [className]: true,
    [styles.HalfWidth]: halfWidth,
    [styles.FullWidth]: fullWidth,
  });

  const buttonStyles = cx({
    [styles.Button]: true,
    [styles.Primary]: primary,
    [styles.Danger]: danger,
    [styles.Save]: save,
    [styles.Dark]: dark,
  });

  return (
    <div className={buttonContainerStyles}>
      <button
        className={buttonStyles}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
