import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// Components
import ImageUpload from '@components/image-upload/image-upload';
import ImageCarousel from '@components/image-carousel/image-carousel';
import Button from '@components/button/button';
import MissingImage from '@components/missing-image/missing-image';

// Styles
import styles from '@components/edit-images/edit-images.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const EditImages = ({
  onImageUpload,
  product,
  onImageDelete,
  missingImageMessage,
  hideAddButton,
  onImageMappingUpdate,
}) => {
  useStyles(styles);

  const handleImageUpload = (image) => {
    if (typeof onImageUpload === 'function') {
      onImageUpload(image);
    }
  };

  const productId = !isEmpty(product) ? product.getId() : null;
  const images = product && product.getImages ? product.getImages() : [];

  return (
    <div className={styles.EditImagesContainer}>
      <div className={styles.CarouselContainer}>
        {images && images.length > 0 ? (
          <ImageCarousel
            images={images}
            onDelete={onImageDelete}
            onImageMappingUpdate={onImageMappingUpdate}
            onImageDelete={onImageDelete}
            showHidden
            showOptions
          />
        ) : (
          <div className={styles.MissingImageContainer}>
            <MissingImage
              className={styles.MissingImage}
              message={missingImageMessage}
            />
          </div>
        )}
      </div>
      {!hideAddButton && (
        <div className={styles.ImageUploadContainer}>
          <ImageUpload
            onImageUploadSuccess={handleImageUpload}
            productId={productId}
          >
            <Button primary>Add Image</Button>
          </ImageUpload>
        </div>
      )}
    </div>
  );
};

EditImages.propTypes = {
  product: PropTypes.object,
  hideAddButton: PropTypes.bool,
  onImageUpload: PropTypes.func,
  onImageDelete: PropTypes.func,
  onImageMappingUpdate: PropTypes.func,
};

EditImages.defaultProps = {
  hideAddButton: false,
};

export default EditImages;
