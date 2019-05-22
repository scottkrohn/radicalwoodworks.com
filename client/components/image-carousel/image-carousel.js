import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { Icon, Carousel } from 'antd';

// Constants
import IMAGES from 'client/constants/image-constants';

// Styles
import styles from 'client/components/image-carousel/image-carousel.less';
import Product from 'model/product';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);

        this.carouselRef = React.createRef();
    }

    getImageThumbUrls = () => {
        const images = get(this.props, 'images', null);
        const imageUrls = [];

        if (images) {
            for (const image of images) {
                const fullUrl = IMAGES.getFullUrl(image.getThumbUrl());
                imageUrls.push(fullUrl);
            }
        }

        return imageUrls;
    };

    onPrev = () => {
        this.carouselRef.prev();
    };

    onNext = () => {
        this.carouselRef.next();
    };

    render = () => {
        const imageThumbUrls = this.getImageThumbUrls();
        const prevButtonClasses = classnames(styles.Button, styles.ButtonPrev);
        const nextButtonClasses = classnames(styles.Button, styles.ButtonNext);

        return (
            <div className={styles.CarouselContainer}>
                <Icon
                    className={prevButtonClasses}
                    theme="filled"
                    type="left-circle"
                    onClick={this.onPrev}
                />
                <Icon
                    className={nextButtonClasses}
                    theme="filled"
                    type="right-circle"
                    onClick={this.onNext}
                />
                <Carousel ref={(node) => (this.carouselRef = node)}>
                    {imageThumbUrls.map((imageUrl) => {
                        return (
                            <div
                                className={styles.ImageContainer}
                                key={uniqueId()}
                            >
                                <img
                                    className={styles.Image}
                                    src={imageUrl}
                                />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        );
    };
}

ImageCarousel.propTypes = {
    product: PropTypes.instanceOf(Product),
};

export default ImageCarousel;
