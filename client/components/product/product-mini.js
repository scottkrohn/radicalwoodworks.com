import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { Icon } from 'antd';

// Constants
import IMAGE from 'constants/image-constants';

// Styles
import 'components/product/product-mini.less';
import NavLink from 'client/components/nav/nav-link';

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
	        image = images.find((image) => {
	            return image.getIsPrimary();
	        });

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

	renderPrice = () => {
	    const product = get(this.props, 'product');

	    if (!product) {
	        return '';
	    }

	    const priceString = product.getPrice();
	    return <div className="price">${priceString}</div>;
	};

	renderTitle = () => {
	    const product = get(this.props, 'product');

	    if (!product) {
	        return '';
	    }


	    return <div className="product-title">{product.getTitle()}</div>;
	};

	render = () => {
	    const product = get(this.props, 'product');
	    const productPageLink = `/products/product/${product.getId()}`;

	    return (
	        <div className="product-mini-container">
	            <NavLink to={productPageLink} className="product-content">
	                {this.renderImage()}
	                {this.renderTitle()}
	                {this.renderPrice()}
	            </NavLink>
	        </div>
	    );
	};
}

export default Product;
