import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Spin } from 'antd';

// Actions
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';

// Component
import ImagePricingSection from 'client/components/product/image-pricing-section';
import ItemInfo from 'client/components/product/item-info';

class ProductContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		const productId = get(this.props, 'match.params.productId');
		this.props.getProduct(productId);
	};

	render = () => {
		const product = get(this.props, 'product', null);
		const productLoaded = !isEmpty(product);

		return (
			<Spin spinning={this.props.loading} size="large">
				<div className="product-container">
					{productLoaded && <ImagePricingSection product={product} />}
					{productLoaded && <ItemInfo product={product} />}
				</div>
			</Spin>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		product: getProductSelector(state),
		loading: getLoading(state),
	};
};

const mapActionsToProps = {
	getProduct,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(ProductContainer);
