import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Models
import Product from 'model/product';

// Styles
import 'client/components/product/item-info.less';

class ItemInfo extends Component {
	constructor(props) {
		super(props);
	}

	renderItemDetails = () => {
		const product = get(this.props, 'product');
		if (!product) {
			return null;
		}

		const defaultColor = product.getDefaultColor();
		const frameWidth = product.getFrameWidth();

		const length = product.getLength();
		const width = product.getWidth();
		const validDimensions = (length && width);

		const innerLength = length - frameWidth;
		const innerWidth = width - frameWidth;
		const validInnerDimensions = (frameWidth && innerLength && innerWidth);

		return (
			<ul className="item-details-list">
				{validDimensions && <li>{`Dimensions: ${length}" x ${width}"`}</li>}
				{validInnerDimensions && <li>{`Inner Dimensions: ${innerLength}" x ${innerWidth}"`}</li>}
				{defaultColor && <li>{`Default Color: ${defaultColor}`}</li>}
			</ul>
		);
	};

	render = () => {
		this.renderItemDetails();
		return (
			<div className="item-info-container">
				<div className="description">
					<h3 className="description-header">Item Description</h3>
					<div dangerouslySetInnerHTML={{ __html: this.props.product.getDescription() }} />
				</div>
				<div className="item-details">
					<h3 className="item-details-header">Details</h3>
					{this.renderItemDetails()}
				</div>
			</div>
		);
	};
}

ItemInfo.propTypes = {
	product: PropTypes.instanceOf(Product),
};

export default ItemInfo;
