import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shuffle } from 'lodash';

// Components
import PageHeader from 'client/components/page-header/page-header';
import TextBlurb from 'client/components/text-blurb/text-blurb';
import HomepageContentGrid from 'client/components/homepage-content-grid/homepage-content-grid';

// Constants
import IMAGES from 'client/constants/image-constants';

const HomepageContainer = () => {
  const getHomepageContent = () => {
    let homepageContent = IMAGES.images.homepage.map((url) => {
      return {
        type: 'image',
        url: IMAGES.getFullUrl(url),
        key: url,
      };
    });

    // Randomize the photo order
    homepageContent = shuffle(homepageContent);

    // // Inject our content squares

    homepageContent.splice(2, null, {
      type: 'content',
      text:
        "We live in sunny Scottsdale, Arizona and love to make handcrafted chalkboards and other wood projects. We believe that good craftsmanship is worth the time and effort, and we put a lot of time and effort into our products. If you're looking for something rustic to spice up your house then we've probably got something for you! Check out our products and let us know what you think!",
      key: 'firstContent',
      buttonText: 'View Products',
      url: '/products',
    });

    homepageContent.splice(5, null, {
      type: 'content',
      text:
        "We absolutely love to do custom projects, so whether you're looking for a uniquely sized chalkboard, a different type of rustic sconce, or you have a crazy idea of your own let us know and we'll be happy to work with you. We are always in the mood for creating something new and would love to hear your ideas!",
      key: 'secondContent',
      buttonText: 'Contact Us',
      url: '/contact',
    });

    return homepageContent;
  };

  const homepageContent = getHomepageContent();
  return (
    <div className="container-fluid">
      <div className="col-12">
        <PageHeader headerText="Radical Woodworks" showButton={false} />

        <TextBlurb
          text="Rustic Handmade Chalkboards and Home Decor"
          className="mb-4"
        />

        <HomepageContentGrid homepageContent={homepageContent} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapActionsToProps = {};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(HomepageContainer),
};
