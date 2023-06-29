import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Components
import Button from '@components/button/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from '@components/page-header/page-header.scss';

const PageHeader = ({
  className,
  text,
  href,
  buttonText,
  headerText,
  onButtonClick,
  showButton,
}) => {

  return (
    <div className={cx(className, styles.PageHeaderContainer)}>
      <div className={styles.LeftLink}>
        {text && href ? (
          <Link href={href}>
            <FontAwesomeIcon
              className={styles.HamburgerIcon}
              icon={faLongArrowAltLeft}
            />
            <span className={styles.LinkText}>{text}</span>
          </Link>
        ) : null}
      </div>
      <div className={styles.HeaderText}>{headerText}</div>
      <div className={styles.Button}>
        {showButton && (
          <Button save className="flex-grow" onClick={onButtonClick}>
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
