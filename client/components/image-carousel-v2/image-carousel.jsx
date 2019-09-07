import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import CarouselNavButton from './carousel-nav-button';
import CarouselDots from './carousel-dots';

// Constants
import IMAGES from '../../constants/image-constants';

import styles from './image-carousel.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

/*
 * TODO:
 * 1. Add options menu like on the old carousel.
 * 2. Support the 'showHidden' prop.
 * 4. Add gallary beneath the image.
 * 5. Make it clickable/scrollable with touch input.
 */

const ImageCarousel = ({ images, showHidden }) => {
  useStyles(styles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const goToNextImage = () => {
    if (currentIndex === imageData.length - 1) {
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

  const goToImageIndex = (index) => {
    if (index === 0) {
      setCurrentIndex(0);
      setTranslateX(0);
    } else {
      const translateCoefficient = getCurrentImageWidth() * Math.abs(currentIndex - index);
      setCurrentIndex(index);
      setTranslateX(translateX - (index < currentIndex ? -translateCoefficient : translateCoefficient));
    }
  };

  const getCurrentImageWidth = () => {
    return document.getElementById(`carousel_image_${imageData[currentIndex].id}`).clientWidth;
  };

  const sortImages = () => {
    if (isEmpty(images)) {
      return [];
    }

    images.sort((a, b) => {
      return a.getIsPrimary() ? -1 : 1;
    });

    return images;
  };

  const imageData = useMemo(() => {
    const imageDataArr = [];
    sortImages(images);

    if (images) {
      for (const image of images) {
        if (image.getHidden() && !showHidden) {
          continue;
        }
        const fullUrl = IMAGES.getFullUrl(image.getThumbUrl());
        const data = {
          url: fullUrl,
          id: image.getId(),
          isPrimary: image.getIsPrimary(),
          hidden: image.getHidden(),
        };

        imageDataArr.push(data);
      }
    }

    return imageDataArr;
  }, [images]);

  return (
    <div>
      <div className={cx(styles.ImageCarouselContainer)}>
        <div
          className={cx(styles.Carousel)}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {imageData &&
            imageData.map((image, index) => {
              return (
                <div
                  className={styles.ImageWrapper}
                  key={image.id}
                  id={`carousel_image_${image.id}`}
                >
                  <img
                    className={cx(styles.Image, currentIndex === index && styles.Active)}
                    src={image.url}
                  />
                </div>
              );
            })}
        </div>
        <CarouselNavButton
          className={styles.PrevNav}
          direction="left"
          onClick={goToPrevImage}
        />
        <CarouselNavButton
          className={styles.NextNav}
          direction="right"
          onClick={goToNextImage}
        />
        <CarouselDots
          count={imageData.length}
          onClick={goToImageIndex}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
