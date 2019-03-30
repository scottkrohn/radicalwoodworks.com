import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, uniqueId } from 'lodash';

// Actions
import { getProducts } from '../actions/products-actions';

class HomepageContainer extends Component {
	componentDidMount = () => {
		this.props.getProducts();
	};

	render = () => {
		const products = get(this.props, 'products.products', []);
		const productsFound = (products.length > 0);

		return (
			<div className='container'>
					<div className='col-xs-12'>
						<div className='text-center'>
							<h1>Radical Woodworks</h1>
							<h3>Under Construction</h3>
							<p><a href='https://www.etsy.com/shop/radicalwoodworks'>Visit Our Etsy Shop</a></p>
						</div>
					</div>
					<div className='col-xs-12'>
						{productsFound && products.map((product) => {
							return (<div key={uniqueId()}>{product.title}</div>);
						})}
					</div>
			</div>
		);
	};
}

// TODO: Use selectors
const mapStateToProps = (state) => state;

const mapActionsToProps = {
	getProducts,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(HomepageContainer);
