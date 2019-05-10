import React, { PureComponent } from 'react';
import { uniqueId } from 'lodash';

// Constants
import IMAGE from 'client/constants/image-constants';

// Styles
import styles from 'client/components/about-us/about-us-info.less';

class AboutUsInfo extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderContent = () => {
        return (
            <div className={styles.AboutUsContent}>
                {this.props.content.map((contentElement) => {
                    return (
                        <div key={uniqueId()}>
                            <div dangerouslySetInnerHTML={{ __html: contentElement.getContent() }} />
                        </div>
                    );
                })}
            </div>
        );
    };

    render = () => {
        return (
            <div className={styles.AboutUsContainer}>
                <img className={styles.AboutUsImage} src={IMAGE.getFullUrl(IMAGE.images.aboutUs.family)} />
                {this.renderContent()}
            </div>
        );
    };
}

export default AboutUsInfo;
