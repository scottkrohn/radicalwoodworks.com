import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from '@components/homepage-content-grid/homepage-content-grid.scss';

// Components
import Button from '@components/button/button';

// Utils
import { observerIsIntersecting } from 'client/utils/observers';

const HomepageImageGrid = (props) => {

  const myRefs = {};
  props.homepageContent.forEach((content) => {
    const ref = React.createRef();
    myRefs[`url_${content.key}`] = {
      ref,
      url: content.url,
      text: content.text,
    };
  });

  const setObservers = () => {
    for (const refKey in myRefs) {
      observerIsIntersecting(myRefs[refKey].ref.current, (target) => {
        target.src = myRefs[refKey].url;
        target.classList.add(styles.Show);
      });
    }
  };

  useEffect(() => {
    setObservers();
  });

  const handleButtonClick = (url) => {
    props.history.push(url);
  };

  const TextContent = (props) => {
    return (
      <div className={styles.TextContentComponent}>
        <div className={styles.ContentText}>{props.content.text}</div>
        {props.content.buttonText && props.content.url && (
          <Button
            dark
            onClick={() => handleButtonClick(props.content.url)}
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
      {props.homepageContent.map((content) => {
        if (content.type === 'image') {
          return (
            <img
              key={content.key}
              ref={myRefs[`url_${content.key}`].ref}
              className={styles.Content}
            />
          );
        } else if (content.type === 'content') {
          return (
            <div
              ref={myRefs[`url_${content.key}`].ref}
              key={content.key}
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

HomepageImageGrid.propTypes = {
  homepageContent: PropTypes.array,
};

HomepageImageGrid.defaultProps = {
  homepageContent: [],
};

export default HomepageImageGrid;
