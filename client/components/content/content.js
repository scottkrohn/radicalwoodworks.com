import React from 'react';

import styles from 'client/components/content/content.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const Content = ({ content }) => {
  useStyles(styles);
  return (
    <div className={styles.ContentContainer}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Content;
