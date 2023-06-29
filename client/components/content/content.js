import React from 'react';

import styles from '@components/content/content.less';


const Content = ({ content }) => {
  
  return (
    <div className={styles.ContentContainer}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Content;
