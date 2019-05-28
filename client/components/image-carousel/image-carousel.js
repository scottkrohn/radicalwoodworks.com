import React, { Component } from 'react';
import { isEmpty, get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { Icon, Carousel } from 'antd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'client/components/base/button/button';
import Snackbar from '@material-ui/core/Snackbar';

// Constants
import IMAGES from 'client/constants/image-constants';

// Styles
import styles from 'client/components/image-carousel/image-carousel.less';

const IMAGE_ACTIONS = {
  delete: 'delete',
  primary: 'primary',
  hide: 'hide',
  show: 'show',
};

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.carouselRef = React.createRef();

    this.state = {
      anchorElement: null,
      currentImageIndex: 0,
      showNotification: false,
      notificationMessage: '',
    };
  }

  getImageData = () => {
    const images = get(this.props, 'images', null);
    const imageData = [];

    if (images) {
      for (const image of images) {
        if (image.getHidden() && !this.props.showHidden) {
          continue;
        }
        const fullUrl = IMAGES.getFullUrl(image.getThumbUrl());
        const data = {
          url: fullUrl,
          id: image.getId(),
          isPrimary: image.getIsPrimary(),
          hidden: image.getHidden(),
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
  };

  onPrev = () => {
    this.carouselRef.prev();
  };

  onNext = () => {
    this.carouselRef.next();
  };

  goToImageIndex = (index, dontAnimate = true) => {
    const images = this.getImageData();
    if (index <=  images.length - 1) {
      this.carouselRef.goTo(index, dontAnimate);
    }
  }

  handleShowNotification = (message) => {
    this.setState({
      showNotification: true,
      notificationMessage: message,
    });
  };

  handleHideNotification = () => {
    this.setState({
      showNotification: false,
    });
  };

  handleChange = (currentIndex) => {
    this.setState({
      currentImageIndex: currentIndex,
    });
  };

  handleMenuItemClick = (action) => {
    const currentImage = this.getCurrentImage();
    if (currentImage) {
      switch (action) {
        case IMAGE_ACTIONS.delete:
          this.props.onDelete(currentImage);
          break;
        case IMAGE_ACTIONS.primary:
          this.props.onImageMappingUpdate(currentImage, true)
            .then(() => {
              this.goToImageIndex(0);
            });
          break;
        case IMAGE_ACTIONS.hide:
          if (currentImage.getIsPrimary()) {
            this.handleShowNotification('Unable to set the PRIMARY image as hidden.');
            break;
          }
          this.props.onImageMappingUpdate(currentImage, null, true);
          break;
        case IMAGE_ACTIONS.show:
          this.props.onImageMappingUpdate(currentImage, null, false);
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

    // We'll only show the various actions if we have a function to call.
    const showDeleteAction = typeof this.props.onDelete === 'function';
    const showPrimaryAction = typeof this.props.onImageMappingUpdate === 'function';
    const showHideAction = typeof this.props.onImageMappingUpdate === 'function';
    const showActions = showDeleteAction || showPrimaryAction || showHideAction;

    return (
      <div className={styles.CarouselContainer}>
        {images.length > 1 && (
          <Icon
            className={prevButtonClasses} theme="filled"
            type="left-circle" onClick={this.onPrev}
          />
        )}
        {images.length > 1 && (
          <Icon
            className={nextButtonClasses} theme="filled"
            type="right-circle" onClick={this.onNext}
          />
        )}
        {images.length === 0 ? (
          <div className={styles.NoImage}>
            <Icon className={styles.NoImageIcon} type="picture" />
          </div>
        ) : (
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
                          id={`menu-${imageData.id}`}
                          anchorEl={this.state.anchorElement}
                          open={Boolean(this.state.anchorElement)}
                          onClose={this.handleMenuClose}
                        >
                          {showPrimaryAction && (
                            <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.primary)}>
                              Make Primary Image
                            </MenuItem>
                          )}
                          {showHideAction && (
                            <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.hide)}>Hide Image</MenuItem>
                          )}
                          {showHideAction && (
                            <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.show)}>Unhide Image</MenuItem>
                          )}
                          {showDeleteAction && (
                            <MenuItem onClick={() => this.handleMenuItemClick(IMAGE_ACTIONS.delete)}>
                              Delete Image
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    )}
                    {showActions && imageData.isPrimary && <div className={styles.ImageBadge}>Primary Image</div>}
                    {showActions && imageData.hidden && <div className={styles.ImageBadge}>Hidden</div>}
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.showNotification}
          autoHideDuration={3000}
          onClose={this.handleHideNotification}
          message={<span>{this.state.notificationMessage}</span>}
        />
      </div>
    );
  };
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
  onDelete: PropTypes.func,
  onImageMappingUpdate: PropTypes.func,
  showHidden: PropTypes.bool,
};

ImageCarousel.defaultProps = {
  showHidden: false,
};

export default ImageCarousel;
