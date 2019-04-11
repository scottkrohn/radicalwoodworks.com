import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageCarousel from 'client/components/image-carousel/image-carousel';
import Pricing from 'client/components/product/pricing';
import Product from 'model/product';

import 'client/components/product/image-pricing-section.less'

class ImagePricingSection extends Component {
	constructor(props) {
		super(props);
	}	

	render = () => {
		const images = this.props.product.getImages();

		return (
			<div className="image-pricing-container">
				<div className="section">
					<ImageCarousel images={images} />
				</div>
				<div className="section">
					<Pricing product={this.props.product} />
				</div>
			</div>
		);
	}
};

ImagePricingSection.propTypes = {
	product: PropTypes.instanceOf(Product),
};

export default ImagePricingSection;