import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, uniqueId } from 'lodash';

// Actions
import { getProducts } from 'actions/products-actions';

// Selectors
import { getProducts as getProductsSelector} from 'selectors/products-selectors';

class HomepageContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getProducts();
	};

	render = () => {
		return (
			<div className="container">
				<div className="col-xs-12">
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						<h3>Under Construction</h3>
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
		products: getProductsSelector(state),
	};
};

const mapActionsToProps = {
	getProducts,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(HomepageContainer);
