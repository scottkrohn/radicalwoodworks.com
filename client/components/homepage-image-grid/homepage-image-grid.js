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
        {this.props.imageUrls.map((imageUrl) => {
          return <img
            key={imageUrl} className={styles.Image}
            src={imageUrl}
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
