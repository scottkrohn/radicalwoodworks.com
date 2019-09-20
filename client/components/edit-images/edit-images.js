import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// Components
import ImageUpload from 'client/components/image-upload/image-upload';
import ImageCarousel from '../../components/image-carousel-v2/image-carousel';
import Button from 'client/components/button/button';

// Styles
import styles from 'client/components/edit-images/edit-images.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const EditImages = ({ onImageUpload, product, onImageDelete, hideAddButton, onImageMappingUpdate }) => {
  useStyles(styles);

  const handleImageUpload = (image) => {
    if (typeof onImageUpload === 'function') {
      onImageUpload(image);
    }
  };

  const getSortedImages = () => {
    const images = !isEmpty(product) ? product.getImages() : [];

    images.sort((a, b) => {
      return a.getIsPrimary() ? -1 : 1;
    });

    return images;
  };

  const images = getSortedImages();
  const productId = !isEmpty(product) ? product.getId() : null;

  return (
    <div className={styles.EditImagesContainer}>
      <div className={styles.CarouselContainer}>
        <ImageCarousel
          images={images}
          onDelete={onImageDelete}
          onImageMappingUpdate={onImageMappingUpdate}
          showHidden
        />
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
