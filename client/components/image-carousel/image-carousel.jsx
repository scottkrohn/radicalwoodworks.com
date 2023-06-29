import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { get, findIndex, isEmpty } from 'lodash';

import CarouselNavButton from './carousel-nav-button';
import CarouselDots from './carousel-dots';
import Modal, { ModalContent, ModalTrigger } from '@components/modal/modal';
import Button from '@components/button/button';

// Constants
import IMAGES from '../../constants/image-constants';

import styles from './image-carousel.scss';


const ImageCarousel = ({
  className,
  images,
  onImageDelete,
  onImageMappingUpdate,
  showOptions,
  showHidden,
}) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [swipeStart, setSwipeStart] = useState(null);
  const [swipeEnd, setSwipeEnd] = useState(null);

  useEffect(() => {
    if (swipeStart && swipeEnd) {
      const diff = swipeStart - swipeEnd;
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          goToNextImage();
        } else {
          goToPrevImage();
        }
      }
      setSwipeStart(null);
      setSwipeEnd(null);
    }
  }, [swipeStart, swipeEnd]);

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
    } else {
      setCurrentIndex(imageData.length - 1);
      setTranslateX((imageData.length - 1) * getCurrentImageWidth() * -1);
    }
  };

  const goToImageIndex = (index) => {
    if (index === 0) {
      setCurrentIndex(0);
      setTranslateX(0);
    } else {
      const translateCoefficient =
        getCurrentImageWidth() * Math.abs(currentIndex - index);
      setCurrentIndex(index);
      setTranslateX(
        translateX -
          (index < currentIndex ? -translateCoefficient : translateCoefficient)
      );
    }
  };

  const getCurrentImageWidth = () => {
    return document.getElementById(
      `carousel_image_${imageData[currentIndex].id}`
    ).clientWidth;
  };

  const sortImages = () => {
    if (isEmpty(images)) {
      return [];
    }

    const primaryIndex = findIndex(images, (image) => {
      return image.getIsPrimary();
    });

    // Move the primary image to the front of the array.
    if (primaryIndex) {
      const primaryImage = images.splice(primaryIndex, 1);
      if (primaryImage.length) {
        images.unshift(primaryImage[0]);
      }
    }

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

  const onSwipeStart = (event) => {
    setSwipeStart(get(event, 'touches[0].clientX'));
  };

  const onSwipeEnd = (event) => {
    setSwipeEnd(get(event, 'changedTouches[0].clientX'));
  };

  return (
    <div className={cx(styles.ImageCarouselContainer, className)}>
      <div
        className={cx(styles.Carousel)}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {imageData &&
          imageData.map((image, index) => {
            return (
              <div
                key={image.id}
                id={`carousel_image_${image.id}`}
                className={styles.SlidePane}
              >
                <Modal>
                  <ModalTrigger>
                    {({ show }) => {
                      return (
                        <div
                          onTouchStart={onSwipeStart}
                          onTouchEnd={onSwipeEnd}
                          className={styles.ImageWrapper}
                        >
                          <img
                            className={cx(
                              styles.Image,
                              currentIndex === index && styles.Active
                            )}
                            onClick={show}
                            src={image.url}
                          />
                          {showOptions && (
                            <Modal headerLabel="Update Image">
                              <ModalTrigger>
                                {({ hide, show }) => {
                                  return (
                                    <div className={styles.OptionsMenu}>
                                      <div
                                        onClick={show}
                                        className={styles.Button}
                                      >
                                        OPTIONS
                                      </div>
                                      {Boolean(image.isPrimary) && (
                                        <div
                                          className={cx(
                                            styles.Primary,
                                            styles.Attribute
                                          )}
                                        >
                                          PRIMARY
                                        </div>
                                      )}
                                      {Boolean(image.hidden) && (
                                        <div
                                          className={cx(
                                            styles.Danger,
                                            styles.Attribute
                                          )}
                                        >
                                          HIDDEN
                                        </div>
                                      )}
                                    </div>
                                  );
                                }}
                              </ModalTrigger>
                              <ModalContent>
                                {({ hide }) => {
                                  return (
                                    <div>
                                      {!image.isPrimary && (
                                        <Button
                                          onClick={() => {
                                            hide();
                                            onImageMappingUpdate(
                                              image.id,
                                              true,
                                              image.hidden
                                            );
                                          }}
                                        >
                                          Make Primary
                                        </Button>
                                      )}
                                      {Boolean(image.hidden) && (
                                        <Button
                                          onClick={() => {
                                            hide();
                                            onImageMappingUpdate(
                                              image.id,
                                              image.isPrimary,
                                              false
                                            );
                                          }}
                                        >
                                          Unhide Image
                                        </Button>
                                      )}
                                      {!image.hidden && !image.isPrimary && (
                                        <Button
                                          onClick={() => {
                                            hide();
                                            onImageMappingUpdate(
                                              image.id,
                                              image.isPrimary,
                                              true
                                            );
                                          }}
                                        >
                                          Hide Image
                                        </Button>
                                      )}
                                      <Button
                                        onClick={() => {
                                          hide();
                                          onImageDelete(image.id);
                                        }}
                                      >
                                        Delete Image
                                      </Button>
                                    </div>
                                  );
                                }}
                              </ModalContent>
                            </Modal>
                          )}
                        </div>
                      );
                    }}
                  </ModalTrigger>
                  <ModalContent>
                    {({ hide }) => {
                      return (
                        <img
                          className={styles.FullSizeImage}
                          src={image.url}
                          onClick={hide}
                        />
                      );
                    }}
                  </ModalContent>
                </Modal>
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
  );
};

export default ImageCarousel;
