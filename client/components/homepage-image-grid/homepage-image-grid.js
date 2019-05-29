import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'client/components/homepage-image-grid/homepage-image-grid.less';

class HomepageImageGrid extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className={styles.ImageGridContainer}>
        {this.props.images.map((imageUrl) => {
          return (
            <img key={imageUrl} className={styles.Image} src={imageUrl} />
          )
        })}
      </div>
    );
  }
}

HomepageImageGrid.propTypes = {
  imagesUrls: PropTypes.array,
};

HomepageImageGrid.defaultProps = {
  imagesUrls: [],
};

export default HomepageImageGrid;
