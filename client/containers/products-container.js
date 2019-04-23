import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, uniqueId } from 'lodash';

// Components
import ProductGrid from 'client/components/product/product-grid';

// Actions
import { getProducts } from 'actions/products-actions';

// Selectors
import { getProducts as getProductsSelector} from 'selectors/products-selectors';
class ProductsContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getProducts();
	};

	render = () => {
		const productsLength = get(this.props, 'products.length', 0);
		const productsLoaded = (productsLength > 0);

		return (
			<div className="container-fluid">
				<div className="col-12">
					<div className="text-center">
						<h1>Radical Woodworks Products</h1>
					</div>
				</div>

				{productsLoaded && <ProductGrid products={this.props.products} />}

			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		products: getProductsSelector(state),
	};
};

const mapActionsToProps = {
	getProducts,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(ProductsContainer);
