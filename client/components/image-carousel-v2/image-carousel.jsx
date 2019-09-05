import React, { useState } from 'react';
import cx from 'classnames';

// Constants
import IMAGES from '../../constants/image-constants';

import styles from './image-carousel.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

/*
 * TODO:
 * 1. Create prev/forward buttons
 * 2. Create indicator dots
 * 3. Add options menu like on the old carousel.
 * 4. Allow arbitrary height/width
 */

const ImageCarousel = ({ images }) => {
  useStyles(styles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const goToNextImage = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      setTranslateX(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTranslateX(translateX - getCurrentImageWidth());
    }
  };

  const goToPrevImage = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
      setTranslateX(translateX + getCurrentImageWidth());
    }
  };

  const goToImageIndex = (index) => {};

  const getCurrentImageWidth = () => {
    const images = getImageData();
    return document.getElementById(`carousel_image_${images[currentIndex].id}`).clientWidth;
  };

  const getImageData = () => {
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

  const imageData = getImageData();
  return (
    <div>
      <div className={cx(styles.ImageCarouselContainer, 'flex')}>
        <div
          className={cx(styles.Carousel, 'flex')}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'transform ease-out 500ms',
          }}
        >
          {imageData &&
            imageData.map((image) => {
              return (
                <div
                  className={styles.ImageWrapper}
                  key={image.id}
                  id={`carousel_image_${image.id}`}
                >
                  <img
                    className={styles.Image}
                    src={image.url}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <button onClick={goToPrevImage}>prev</button>
      <button onClick={goToNextImage}>next</button>
    </div>
  );
};

export default ImageCarousel;
