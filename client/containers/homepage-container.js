import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shuffle } from 'lodash';

// Components
import PageHeader from 'client/components/page-header/page-header';
import TextBlurb from 'client/components/text-blurb/text-blurb';
import HomepageImageGrid from 'client/components/homepage-image-grid/homepage-image-grid';

// Constants
import IMAGES from 'client/constants/image-constants';

class HomepageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    let homepageImageUrls = IMAGES.images.homepage.map((url) => {
      return IMAGES.getFullUrl(url);
    });

    homepageImageUrls = shuffle(homepageImageUrls);


    return (
      <div className="container-fluid">
        <div className="col-12">
          <PageHeader
            headerText='Radical Woodworks'
            showButton={false}
          />

          <TextBlurb
            text="Rustic Handmade Chalkboards and Home Decor"
            className="mb-4"
          />

          <HomepageImageGrid imageUrls={homepageImageUrls} />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomepageContainer);
