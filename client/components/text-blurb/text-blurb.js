import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import styles from '@components/text-blurb/text-blurb.module.scss';


const TextBlurb = ({ className, text }) => {

  const textBlurbClasses = classNames({
    [styles.TextBlurbContainer]: true,
    [className]: !!className,
  });

  return (
    <div className={textBlurbClasses}>
      <span>{text}</span>
    </div>
  );
};

TextBlurb.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default TextBlurb;
