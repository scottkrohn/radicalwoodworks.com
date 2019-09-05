import React from 'react';

import { storiesOf } from '@storybook/react';

import ImageCarousel from '../image-carousel-v2/image-carousel';
import Image from '../../../model/image';

const imageData = [
  { id: 1, thumb_url: '24x36_ebony_1.jpg', main_url: '24x36_ebony_1.jpg', hidden: 0, is_primary: 0 },
  { id: 2, thumb_url: '24x36_ebony_2.jpg', main_url: '24x36_ebony_2.jpg', hidden: 0, is_primary: 0 },
  { id: 3, thumb_url: '24x36_ebony_3.jpg', main_url: '24x36_ebony_3.jpg', hidden: 0, is_primary: 1 },
  { id: 4, thumb_url: 'stain_selection.jpg', main_url: 'stain_selection.jpg', hidden: 0, is_primary: 0 },
];

const images = [];
for (const image of imageData) {
  const img = new Image();
  img.setValues(image);
  images.push(img);
}

storiesOf('Image Carousel', module).add('Image Carousel', () => {
  return <ImageCarousel images={images} />;
});
