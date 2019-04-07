import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Actions
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector } from 'client/selectors/product-selectors';

class ProductContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		const productId = get(this.props, 'match.params.productId');
		this.props.getProduct(productId);
	};

	render = () => {
		return (
			<div className="container">
				<div className="col-xs-12">
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						<h3>Product Under Construction</h3>
						<p>
							<a href="https://www.etsy.com/shop/radicalwoodworks">Visit Our Etsy Shop</a>
						</p>
					</div>
				</div>
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
