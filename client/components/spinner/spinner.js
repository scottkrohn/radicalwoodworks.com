import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';

// Styles
import 'client/components/spinner/spinner.less';

class Spinner extends PureComponent {
    constructor(props) {
        super(props);
    }


    render = () => {
        const dimmerClasses = classnames({
            ['dimmable']: this.props.spinning,
        });

        return (
            <div className="spinner-container">
                {this.props.spinning && <CircularProgress className="spinner" />}
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
