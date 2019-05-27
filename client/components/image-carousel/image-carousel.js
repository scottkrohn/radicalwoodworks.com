import React, { Component } from 'react';
import { isEmpty, get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { Icon, Carousel } from 'antd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'client/components/base/button/button';

// Constants
import IMAGES from 'client/constants/image-constants';

// Styles
import styles from 'client/components/image-carousel/image-carousel.less';
import Product from 'model/product';
import ACTIONS from 'client/constants/action-constants';

const IMAGE_ACTIONS = {
  delete: 'delete',
  primary: 'primary',
};

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.carouselRef = React.createRef();

    this.state = {
      anchorElement: null,
      currentImageIndex: 0,
    };
  }

  getImageData = () => {
    const images = get(this.props, 'images', null);
    const imageData = [];

    if (images) {
      for (const image of images) {
        const fullUrl = IMAGES.getFullUrl(image.getThumbUrl());
        const data = {
          url: fullUrl,
          id: image.getId(),
          isPrimary: image.getIsPrimary(),
        };
        imageData.push(data);
      }
    }

    return imageData;
  };

  getCurrentImage = () => {
    let currentImage = null;
    const images = get(this.props, 'images', null);
    if (!isEmpty(images)) {
      currentImage = images[this.state.currentImageIndex];
    }
    
    return currentImage;
  }

  onPrev = () => {
    this.carouselRef.prev();
  };

  onNext = () => {
    this.carouselRef.next();
  };

  handleChange = (currentIndex) => {
    this.setState({
      currentImageIndex: currentIndex,
    });
  }

  handleMenuItemClick = (action) => {
    const currentImage = this.getCurrentImage();
    if (currentImage) {
      switch (action) {
        case IMAGE_ACTIONS.delete:
          this.props.onDelete(currentImage);
          break;
        case IMAGE_ACTIONS.primary:
          this.props.onSetPrimary(currentImage);
          break;
      }
    }

    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({
      anchorElement: null,
    });
  };

  handleOpenMenu = (e) => {
    this.setState({
      anchorElement: e.currentTarget,
    });
  };

  render = () => {
    const images = this.getImageData();
    const prevButtonClasses = classnames(styles.Button, styles.ButtonPrev);
    const nextButtonClasses = classnames(styles.Button, styles.ButtonNext);

    // We'll only show the delete button if we have a function to call.
    const showDeleteAction = typeof this.props.onDelete === 'function';
    const showPrimaryAction = typeof this.props.onSetPrimary === 'function';
    const showActions = showDeleteAction || showPrimaryAction;

    return (
      <div className={styles.CarouselContainer}>
        <Icon
          className={prevButtonClasses} theme="filled"
          type="left-circle" onClick={this.onPrev}
        />
        <Icon
          className={nextButtonClasses} theme="filled"
          type="right-circle" onClick={this.onNext}
        />
        <Carousel ref={(node) => (this.carouselRef = node)} afterChange={this.handleChange}>
          {images.map((imageData) => {
            return (
              <div className={styles.ImageContainer} key={imageData.id}>
                <div className={styles.ImageActionsWrapper}>
                  <img className={styles.Image} src={imageData.url} />
                  {showActions && (
                    <div className={styles.Actions}>
                      <Button textOnly onClick={this.handleOpenMenu}>
                        Actions
                      </Button>
                      <Menu
                        id="menu"
                        anchorEl={this.state.anchorElement}
                        open={Boolean(this.state.anchorElement)}
                        onClose={this.handleMenuClose}
                      >
                        <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.delete)}>Delete Image</MenuItem>
                        <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.primary)}>Make Primary Image</MenuItem>
                      </Menu>
                    </div>
                  )}
                  {(showActions && imageData.isPrimary) && (<div className={styles.PrimaryBadge}>Primary Image</div>)}
                </div>
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
  onDelete: PropTypes.func,
  onSetPrimary: PropTypes.func,
};

export default ImageCarousel;
