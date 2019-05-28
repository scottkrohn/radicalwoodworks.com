import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from 'client/components/base/button/button';

// Styles
import styles from 'client/components/page-header/page-header.less';

class PageHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className={styles.PageHeaderContainer}>
        <div>{/* This is a placeholder div for flexbox. Don't delete me! */}</div>
        <div className={styles.HeaderText}>
          {this.props.headerText}
        </div>
        <div className={styles.Button}>
          {this.props.showButton && (
            <Button
              variant="contained"
              color="save"
              onClick={this.props.onButtonClick}
            >
              {this.props.buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

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