import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import styles from 'client/components/text-blurb/text-blurb.less';

class TextBlurb extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    const textBlurbClasses = classNames({
      [styles.TextBlurbContainer]: true,
      [this.props.className]: !!this.props.className,
    });

    return (
      <div className={textBlurbClasses}>
        <span>
          {this.props.text}
        </span>
      </div>
    );
  }
}

TextBlurb.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default TextBlurb;
