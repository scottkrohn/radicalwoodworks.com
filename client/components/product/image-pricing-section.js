import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';

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

  getSortedImages = () => {
    const images = !isEmpty(this.props.product) ? this.props.product.getImages() : [];

    images.sort((a, b) => {
      return a.getIsPrimary() ? -1 : 1;
    });

    return images;
  }

  render = () => {
    const images = this.getSortedImages();

    const imageSectionClasses = classnames({
      ['col-lg-6']: true,
      ['col-md-12']: true,
      [styles.ImageSectionNoImages]: images.length < 1,
    });

    const pricingClasses = classnames({
      ['col-lg-6']: true,
      ['col-md-12']: true,
      [styles.Pricing]: true,
    });

    return (
      <div className="row">
        <div className={imageSectionClasses}>
          <ImageCarousel images={images} />
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
