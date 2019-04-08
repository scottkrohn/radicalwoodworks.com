import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
import PropTypes from 'prop-types';

// Components
import { Carousel } from 'antd';

// Constants
import IMAGES from 'client/constants/image-constants';

// Styles
import 'client/components/image-carousel/image-carousel.less';
import Product from 'model/product';

class ImageCarousel extends Component {
	constructor(props) {
		super(props);
	}

	getImageThumbUrls = () => {
		const images = get(this.props, 'images', null);
		const imageUrls = [];

		if (images) {
			for (const image of images) {
				const fullUrl = IMAGES.getFullUrl(image.getThumbUrl());
				imageUrls.push(fullUrl);
			}
		}

		return imageUrls;
	};

	onImageChange = (a, b, c) => {
		console.log(a, b, c);
	};

	render = () => {
		const imageThumbUrls = this.getImageThumbUrls();
		return (
			<div className="image-carousel-container">
				<Carousel afterChange={this.onImageChange}>
					{imageThumbUrls.map((imageUrl) => {
						return (
							<div className="image-container" key={uniqueId()}>
								<img className="image" src={imageUrl} />
							</div>
						);
					})}
				</Carousel>
			</div>
		);
	};
}

ImageCarousel.propTypes = {
	product: PropTypes.instanceOf(Product),
};

export default ImageCarousel;
