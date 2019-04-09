import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from 'model/product';

// Styles
import 'client/components/product/description.less';

class Description extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="description-container">
				<div dangerouslySetInnerHTML={{__html: this.props.product.getDescription()}} />
			</div>
		);
	}
};

Description.propTypes = {
	product: PropTypes.instanceOf(Product),
};

export default Description;