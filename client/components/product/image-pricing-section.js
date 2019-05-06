import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Icon } from 'antd';
import ImageCarousel from 'client/components/image-carousel/image-carousel';
import Pricing from 'client/components/product/pricing';

// Models
import Product from 'model/product';

// Styles
import 'client/components/product/image-pricing-section.less';

class ImagePricingSection extends Component {
    constructor(props) {
        super(props);
    }

	render = () => {
	    const images = this.props.product.getImages();

	    const imageSectionClasses = ['col-lg-6', 'col-md-12'];
	    if (images.length < 1) {
	        imageSectionClasses.push('image-section-no-images');
	    }

	    return (
	        <div className="row">
	            <div className={imageSectionClasses.join(' ')}>
	                {(images.length > 0) ? (
	                    <ImageCarousel images={images} />
	                ) : (
	                    <div className="no-image">
	                        <Icon className="no-image-icon" type="picture" />
	                    </div>
	                )}
	            </div>
	            <div className="col-lg-6 col-md-12 pricing">
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
