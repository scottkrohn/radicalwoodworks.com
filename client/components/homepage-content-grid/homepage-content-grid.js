import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from 'client/components/homepage-content-grid/homepage-content-grid.scss';

// Components
import Button from 'client/components/base/button/button';

// Utils
import { observerIsIntersecting } from 'client/utils/observers';


// HOCs
import { withRouter } from 'react-router-dom';

class HomepageImageGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
    };

    this.myRefs = {};
    this.props.homepageContent.forEach((content) => {
      const ref = React.createRef();
      this.myRefs[`url_${content.key}`] = { ref, url: content.url, text: content.text };
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

  handleButtonClick = (url) => {
    this.props.history.push(url);
  }

  render = () => {
    const TextContent = (props) => {
      return (
        <div className={styles.TextContentComponent}>
          <div className={styles.ContentText}>{props.content.text}</div>
          {props.content.buttonText && props.content.url && (
            <Button
              variant="contained" color="dark"
              halfWidth
              onClick={() => this.handleButtonClick(props.content.url)}
              className={styles.ContentButton}
            >
              {props.content.buttonText}
            </Button>
          )}
        </div>
      );
    };

    return (
      <div className={styles.ImageGridContainer}>
        {this.props.homepageContent.map((content) => {
          if (content.type === 'image') {
            return <img
              key={content.key} ref={this.myRefs[`url_${content.key}`].ref}
              className={styles.Content}
            />;
          } else if (content.type === 'content') {
            return (
              <div
                ref={this.myRefs[`url_${content.key}`].ref} key={content.key}
                className={styles.TextContent}
              >
                <TextContent content={content} />
              </div>
            );
          }
        })}
      </div>
    );
  };
}

HomepageImageGrid.propTypes = {
  homepageContent: PropTypes.array,
};

HomepageImageGrid.defaultProps = {
  homepageContent: [],
};

export default withRouter(HomepageImageGrid);
