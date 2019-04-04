import React, { Component } from 'react';
import { get } from 'lodash';

// Constants
import IMAGE from 'constants/image-constants'

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
        const firstImage = get(images, '[0]');
        if (firstImage) {
            console.log(firstImage);
        }
        return firstImage ? firstImage.getThumbUrl() : null;
    }

    render = () => {
        const imageUrl = this.getMainImageUrl();

        return (
        <div className="product">
            {this.props.product.getTitle()}
            {imageUrl && <img src={IMAGE.getFullUrl(imageUrl)}></img>}
        </div>
        );
    };
};

export default Product;