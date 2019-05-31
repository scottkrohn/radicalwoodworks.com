import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Grow from '@material-ui/core/Grow';

// Styles
import styles from 'client/components/homepage-image-grid/homepage-image-grid.scss';

// Utils
import { observerIsIntersecting } from 'client/utils/observers';

class HomepageImageGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
    };

    this.myRefs = {};
    this.props.imageUrls.forEach((url) => {
      const ref = React.createRef();
      this.myRefs[`url_${url}`] = { ref, url };
    });
  }

  setObservers = () => {
    for (const refKey in this.myRefs) {
      observerIsIntersecting(this.myRefs[refKey].ref.current, (target) => {
        target.src = this.myRefs[refKey].url;
        target.classList.add(styles.Show);
      });
    }
  };

  componentDidUpdate = () => {
    this.setObservers();
  };

  componentDidMount = () => {
    this.setObservers();
  };

  render = () => {
    return (
      <div className={styles.ImageGridContainer}>
        {this.props.imageUrls.map((imageUrl) => {
          return <img
            key={imageUrl} ref={this.myRefs[`url_${imageUrl}`].ref}
            className={styles.Image}
          />;
        })}
      </div>
    );
  };
}

HomepageImageGrid.propTypes = {
  imageUrls: PropTypes.array,
};

HomepageImageGrid.defaultProps = {
  imageUrls: [],
};

export default HomepageImageGrid;
