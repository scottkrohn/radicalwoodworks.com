import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { Icon } from 'antd';
import ImageCarousel from 'client/components/image-carousel/image-carousel';
import Pricing from 'client/components/product/pricing';

// Models
import Product from 'model/product';

// Styles
import styles from 'client/components/product/image-pricing-section.less';

class ImagePricingSection extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const images = this.props.product.getImages();

        const imageSectionClasses = classnames({
            ['col-lg-6']: true,
            ['col-mg-12']: true,
            [styles.ImageSectionNoImages]: images.length < 1,
        });

        const pricingClasses = classnames({
            ['col-lg-6']: true,
            ['col-mg-12']: true,
            [styles.Pricing]: true,
        });

        return (
            <div className="row">
                <div className={imageSectionClasses}>
                    {images.length > 0 ? (
                        <ImageCarousel images={images} />
                    ) : (
                        <div className={styles.NoImage}>
                            <Icon className={styles.NoImageIcon} type="picture" />
                        </div>
                    )}
                </div>
                <div className={pricingClasses}>
                    <Pricing product={this.props.product} />
                </div>
            </div>
        );
    };
}

ImagePricingSection.propTypes = {
    product: PropTypes.instanceOf(Product),
};

export default ImagePricingSection;
