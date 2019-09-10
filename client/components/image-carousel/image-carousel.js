import React, { useRef, useEffect, useState } from 'react';
import { isEmpty, get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { Icon, Carousel } from 'antd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'client/components/button/button';
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

const ImageCarousel = (props) => {
  let carouselRef = useRef(null);
  const [anchorElement, setAnchorElement] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const getImageData = () => {
    const images = get(props, 'images', null);
    const imageData = [];

    if (images) {
      for (const image of images) {
        if (image.getHidden() && !props.showHidden) {
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

  const getCurrentImage = () => {
    let currentImage = null;
    const images = get(props, 'images', null);
    if (!isEmpty(images)) {
      currentImage = images[currentImageIndex];
    }

    return currentImage;
  };

  const onPrev = () => {
    carouselRef.prev();
  };

  const onNext = () => {
    carouselRef.next();
  };

  const goToImageIndex = (index, dontAnimate = true) => {
    const images = getImageData();
    if (index <= images.length - 1) {
      carouselRef.goTo(index, dontAnimate);
    }
  };

  const handleShowNotification = (message) => {
    setShowNotification(true);
    setNotificationMessage(message)
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const handleChange = (currentIndex) => {
    setCurrentImageIndex(currentIndex);
  };

  const handleMenuItemClick = (action) => {
    const currentImage = getCurrentImage();
    if (currentImage) {
      switch (action) {
        case IMAGE_ACTIONS.delete:
          props.onDelete(currentImage);
          break;
        case IMAGE_ACTIONS.primary:
          props.onImageMappingUpdate(currentImage, true).then(() => {
            goToImageIndex(0);
          });
          break;
        case IMAGE_ACTIONS.hide:
          if (currentImage.getIsPrimary()) {
            handleShowNotification('Unable to set the PRIMARY image as hidden.');
            break;
          }
          props.onImageMappingUpdate(currentImage, null, true);
          break;
        case IMAGE_ACTIONS.show:
          props.onImageMappingUpdate(currentImage, null, false);
          break;
      }
    }

    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleOpenMenu = (e) => {
    setAnchorElement(e.currentTarget);
  };

  const images = getImageData();
  const prevButtonClasses = classnames(styles.Button, styles.ButtonPrev);
  const nextButtonClasses = classnames(styles.Button, styles.ButtonNext);

  // We'll only show the various actions if we have a function to call.
  const showDeleteAction = typeof props.onDelete === 'function';
  const showPrimaryAction = typeof props.onImageMappingUpdate === 'function';
  const showHideAction = typeof props.onImageMappingUpdate === 'function';
  const showActions = showDeleteAction || showPrimaryAction || showHideAction;

  return (
    <div className={styles.CarouselContainer}>
      {images.length > 1 && (
        <Icon
          className={prevButtonClasses} theme="filled"
          type="left-circle" onClick={onPrev}
        />
      )}
      {images.length > 1 && (
        <Icon
          className={nextButtonClasses} theme="filled"
          type="right-circle" onClick={onNext}
        />
      )}
      {images.length === 0 ? (
        <div className={styles.NoImage}>
          <Icon className={styles.NoImageIcon} type="picture" />
        </div>
      ) : (
        <Carousel ref={(node) => (carouselRef = node)} afterChange={handleChange}>
          {images.map((imageData) => {
            return (
              <div className={styles.ImageContainer} key={imageData.id}>
                <div className={styles.ImageActionsWrapper}>
                  <img className={styles.Image} src={imageData.url} />
                  {showActions && (
                    <div className={styles.Actions}>
                      <Button
                        textOnly className={styles.ActionButton}
                        onClick={handleOpenMenu}
                      >
                        Actions
                      </Button>
                      <Menu
                        id={`menu-${imageData.id}`}
                        anchorEl={anchorElement}
                        open={Boolean(anchorElement)}
                        onClose={handleMenuClose}
                      >
                        {showPrimaryAction && (
                          <MenuItem onClick={() => handleMenuItemClick(IMAGE_ACTIONS.primary)}>
                            <span className={styles.MenuItem}>Make Primary Image</span>
                          </MenuItem>
                        )}
                        {showHideAction && (
                          <MenuItem onClick={() => handleMenuItemClick(IMAGE_ACTIONS.hide)}>
                            <span className={styles.MenuItem}>Hide Images</span>
                          </MenuItem>
                        )}
                        {showHideAction && (
                          <MenuItem onClick={() => handleMenuItemClick(IMAGE_ACTIONS.show)}>
                            <span className={styles.MenuItem}>Unhide Image</span>
                          </MenuItem>
                        )}
                        {showDeleteAction && (
                          <MenuItem onClick={() => handleMenuItemClick(IMAGE_ACTIONS.delete)}>
                            <span className={styles.MenuItem}>Delete Image</span>
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
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleHideNotification}
        message={<span>{notificationMessage}</span>}
      />
    </div>
  );
};

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
