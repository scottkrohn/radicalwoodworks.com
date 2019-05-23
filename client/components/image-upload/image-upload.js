import React, { PureComponent } from 'react';
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

class ImageUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

    onImageUpload = e => {
      const files = Array.from(e.target.files);
      const file = files[0];

      this.props.uploadImage(file, this.props.productId).then(result => {
        if (typeof this.props.onImageUploadSuccess === 'function') {
          this.props.onImageUploadSuccess(result);
        }
      });
    };

    handleImageUploadClick = () => {
      this.inputRef.current.click();
    };

    renderInputButton = () => {
      let inputButton = null;

      if (this.props.type === 'box') {
        inputButton = (
          <div className={styles.FileInputBox}>
            <FontAwesomeIcon
              className={styles.FileInputPlus}
              icon={faPlus}
            />
          </div>
        );
      } else {
        inputButton = this.props.children;
      }

      return inputButton;
    };

    render = () => {
      const wrapperClasses = classNames({
        [styles.ChildrenWrapper]: true,
        [this.props.className]: !!this.props.className,
      });

      return (
        <div
          onClick={this.handleImageUploadClick}
          className={wrapperClasses}
        >
          <input
            className={styles.HiddenInput}
            onChange={this.onImageUpload}
            ref={this.inputRef}
            type="file"
          />
          {this.renderInputButton()}
        </div>
      );
    };
}

ImageUpload.propTypes = {
  uploadImage: PropTypes.func,
  onImageUploadSuccess: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  productId: PropTypes.number,
};

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ImageUpload);
