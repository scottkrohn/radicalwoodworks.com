import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';

// Styles
import styles from 'client/components/spinner/spinner.less';

class Spinner extends PureComponent {
    constructor(props) {
        super(props);
    }


    render = () => {
        const dimmerClasses = classnames({
            [styles.Dimmable]: this.props.spinning,
        });

        return (
            <div className={styles.SpinnerContainer}>
                {this.props.spinning && <CircularProgress className={styles.Spinner} />}
                <div className={dimmerClasses}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Spinner.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    spinning: PropTypes.bool,
};

export default Spinner;
