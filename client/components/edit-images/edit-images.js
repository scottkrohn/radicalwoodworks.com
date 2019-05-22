import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// Components
import ImageUpload from 'client/components/image-upload/image-upload';
import ImageCarousel from 'client/components/image-carousel/image-carousel';
import Button from 'client/components/base/button/button';

// Styles
import styles from 'client/components/edit-images/edit-images.less';

class EditImages extends PureComponent {
    constructor(props) {
        super(props);
    }

    onImageUpload = (image) => {
        if (typeof this.props.onImageUpload === 'function') {
            this.props.onImageUpload(image);
        }
    }

    render = () => {
        const images = !isEmpty(this.props.product) ? this.props.product.getImages() : [];
        const productId = !isEmpty(this.props.product) ? this.props.product.getId() : null;

        return (
            <div className={styles.EditImagesContainer}>
                <div className={styles.CarouselContainer}>
                    <ImageCarousel images={images} />
                </div>
                <div className={styles.ImageUploadContainer}>
                    <ImageUpload
                        onImageUploadSuccess={this.onImageUpload}
                        productId={productId}
                    >
                        <Button
                            variant="contained"
                            slim
                            color="primary"
                        >
                            Add Image
                        </Button>
                    </ImageUpload>
                </div>
            </div>
        );
    };
}

EditImages.propTypes = {
    product: PropTypes.object,
    onImageUpload: PropTypes.func,
};

export default EditImages;
