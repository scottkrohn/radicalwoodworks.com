import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Actions
import { uploadImage } from 'client/actions/upload-actions';

// Styles
import styles from 'client/components/image-upload/image-upload.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const ImageUpload = ({ children, className, uploadImage, productId, onImageUploadSuccess, type }) => {
  useStyles(styles);
  const inputRef = useRef(null);

  const onImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];

    uploadImage(file, productId).then((result) => {
      if (typeof onImageUploadSuccess === 'function') {
        onImageUploadSuccess(result);
      }
    });
  };

  const handleImageUploadClick = () => {
    inputRef.current.click();
  };

  const renderInputButton = () => {
    let inputButton = null;

    if (type === 'box') {
      inputButton = (
        <div className={styles.FileInputBox}>
          <FontAwesomeIcon
            className={styles.FileInputPlus}
            icon={faPlus}
          />
        </div>
      );
    } else {
      inputButton = children;
    }

    return inputButton;
  };

  const wrapperClasses = classNames({
    [styles.ChildrenWrapper]: true,
    [className]: !!className,
  });

  return (
    <div
      onClick={handleImageUploadClick}
      className={wrapperClasses}
    >
      <input
        className={styles.HiddenInput}
        onChange={onImageUpload}
        ref={inputRef}
        type="file"
      />
      {renderInputButton()}
    </div>
  );
};

ImageUpload.propTypes = {
  uploadImage: PropTypes.func,
  onImageUploadSuccess: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  productId: PropTypes.number,
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ImageUpload);
