import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

// Actions
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector } from 'client/selectors/product-selectors';

// Component
import ImageCaroupsel from 'client/components/image-carousel/image-carousel';
import ImagePricingSection from 'client/components/product/image-pricing-section';

class ProductContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		console.log('mounted');
		const productId = get(this.props, 'match.params.productId');
		this.props.getProduct(productId);
	};

	render = () => {
		const product = get(this.props, 'product', null);
		const productLoaded = !isEmpty(product);

		return (
			<div className="product-container">
				{productLoaded && <ImagePricingSection product={product} />}
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		product: getProductSelector(state),
	};
};

const mapActionsToProps = {
	getProduct,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(ProductContainer);
