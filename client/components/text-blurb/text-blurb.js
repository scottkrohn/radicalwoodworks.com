import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import styles from '@components/text-blurb/text-blurb.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const TextBlurb = ({ className, text }) => {
  useStyles(styles);

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
