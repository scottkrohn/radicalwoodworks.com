const IMAGE = {
  s3Base: 'https://s3-us-west-1.amazonaws.com/radicalwoodworks-images/',
  imagePaths: {
    etsyLogo: 'etsy-logo.svg',
  },
  images: {
    aboutUs: {
      family: 'about-family.jpg',
    },
    homepage: [
      'homepage_1.jpg',
      'homepage_2.jpg',
      'homepage_3.jpg',
      'homepage_4.jpg',
      'homepage_5.jpg',
      'homepage_6.jpg',
      'homepage_7.jpg',
      'homepage_8.jpg',
    ],
  },
};

IMAGE.getFullUrl = (path) => {
  return `${IMAGE.s3Base}${path}`;
};

export default IMAGE;
