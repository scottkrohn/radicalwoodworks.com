import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Grow from '@material-ui/core/Grow';

// Styles
import styles from 'client/components/homepage-image-grid/homepage-image-grid.scss';

class HomepageImageGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      mounted: true,
    });
  };

  render = () => {

    return (
      <div className={styles.ImageGridContainer}>
        {this.props.imageUrls.map((imageUrl) => {
          return (
            <Grow
              key={imageUrl} in={this.state.mounted}
              timeout={1000}
            >
              <img className={styles.Image} src={imageUrl} />
            </Grow>
          );
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
