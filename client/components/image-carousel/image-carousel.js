import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
import PropTypes from 'prop-types';

// Components
import { Icon, Carousel } from 'antd';

// Constants
import IMAGES from 'client/constants/image-constants';

// Styles
import 'client/components/image-carousel/image-carousel.less';
import Product from 'model/product';

class ImageCarousel extends Component {
	constructor(props) {
		super(props);

		this.carouselRef = React.createRef();
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

	onPrev = () => {
		this.carouselRef.prev();
	}

	onNext = () => {
		this.carouselRef.next();
	}

	render = () => {
		const imageThumbUrls = this.getImageThumbUrls();
		return (
			<div className="image-carousel-container">
				<Icon className="button button-prev" theme="filled" type="left-circle" onClick={this.onPrev} />
				<Icon className="button button-next" theme="filled" type="right-circle" onClick={this.onNext} />
				<Carousel ref={(node) => (this.carouselRef = node)} >
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
