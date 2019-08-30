import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from 'client/components/base/button/button';

// Styles
import styles from 'client/components/page-header/page-header.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const PageHeader = ({ buttonText, headerText, onButtonClick, showButton }) => {
  useStyles(styles);

  return (
    <div className={styles.PageHeaderContainer}>
      <div>{/* This is a placeholder div for flexbox. Don't delete me! */}</div>
      <div className={styles.HeaderText}>{headerText}</div>
      <div className={styles.Button}>
        {showButton && (
          <Button
            variant="contained"
            color="save"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  onButtonClick: PropTypes.func,
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
};

PageHeader.defaultProps = {
  showButton: true,
};

export default PageHeader;
