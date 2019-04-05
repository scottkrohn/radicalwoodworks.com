import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { Icon } from 'antd';

// Constants
import IMAGE from 'constants/image-constants';

// Styles
import 'components/product/product-mini.less';

class Product extends Component {
	constructor(props) {
		super(props);
	}

	// For now this just grabs the first image.
	getMainImageUrl = () => {
		const product = get(this.props, 'product');

		if (!product) {
			return null;
		}

		const images = product.getImages();
		let image = null;
		if (!isEmpty(images)) {
			image = images.find((image) => {return image.getIsPrimary()})

			// Fallback to first image if nothing is marked primary.
			if (!image) {
				const image = get(images, '[0]', null);
			}
		} 

		return image ? image.getThumbUrl() : null;
	};

	renderImage = () => {
		const imageUrl = this.getMainImageUrl();

		return (
			<div>
				{imageUrl ? (
					<img className="product-image" src={IMAGE.getFullUrl(imageUrl)} />
				) : (
					<div className="no-image">
						<Icon className="no-image-icon" type="picture" />
					</div>
				)}
			</div>
		);
	};

	render = () => {
		return (
			<div>
				<a className="product-content" href="javascript:;">
					{this.renderImage()}
					<div className="product-title">{this.props.product.getTitle()}</div>
				</a>
			</div>
		);
	};
}

export default Product;
