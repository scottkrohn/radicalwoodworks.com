import React, { PureComponent } from 'react';
import { uniqueId } from 'lodash';

// Constants
import IMAGE from 'client/constants/image-constants';

// Styles
import styles from 'client/components/about-us/about-us-info.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const AboutUsInfo = ({ content }) => {
  useStyles(styles);
  const renderContent = () => {
    return (
      <div className={styles.AboutUsContent}>
        {content.map((contentElement) => {
          return (
            <div key={uniqueId()}>
              <div dangerouslySetInnerHTML={{ __html: contentElement.getContent() }} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.AboutUsContainer}>
      <img
        className={styles.AboutUsImage}
        src={IMAGE.getFullUrl(IMAGE.images.aboutUs.family)}
      />
      {renderContent()}
    </div>
  );
};

export default AboutUsInfo;
