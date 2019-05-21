import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ImageUpload from 'client/components/image-upload/image-upload';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';

// HOCs
import { withValidation } from 'client/hoc/auth';

// TODO: Move the image upload stuff to an image upload carousel type thingy.

class AdminProductContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        (async () => {
            try {
                await this.props.verifyLogin();
            } catch (error) {
                this.props.redirectToHome();
            }
        })();
    };

    onImageUpload = (url) => {
        console.log(url);
    };

    render = () => {
        return (
            <div className="container-fluid">
                Admin Product Container
                <ImageUpload
                    type="box"
                    onImageUploadSuccess={this.onImageUpload}
                />
            </div>
        );
    };
}

AdminProductContainer.propTypes = {
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        product: getProductSelector(state),
        loading: getLoading(state),
    };
};

const mapActionsToProps = {
    verifyLogin,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withValidation(AdminProductContainer));
