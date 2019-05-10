import React, { PureComponent } from 'react';

import styles from 'client/components/content/content.less';

class Content extends PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className={styles.ContentContainer}>
                <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>
        );
    };
}

export default Content;
