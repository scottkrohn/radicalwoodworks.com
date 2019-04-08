import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'client/components/product/pricing.less';
import Product from 'model/product';

class Pricing extends Component {
	constructor(props) {
		super(props);
	}

	getPriceValue = () => {
		const priceValue = this.props.product.getPrice().toFixed(2);
		return `$${priceValue}`;
	}

	getShippingValue = () => {
		const shippingValue = this.props.product.getShippingPrice();
		return (shippingValue > 0) ? `$${shippingValue.toFixed(2)}` : 'Free';
	}

	render = () => {
		return (
			<div className="pricing-container">
				<div className="title">
					<span>{this.props.product.getTitle()}</span>
				</div>
				<div className="price">
					<span className="price-label">Price: </span>
					<span className="price-value">{this.getPriceValue()}</span>
				</div>
				<div className="shipping">
					<span className="shipping-label">Shipping: </span>
					<span className="shipping-value">{this.getShippingValue()}</span>
				</div>
			</div>
		);
	}
}

Pricing.propTypes = {
	product: PropTypes.instanceOf(Product),
};

export default Pricing;