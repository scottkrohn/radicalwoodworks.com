import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Move this to the PRODUCT page, not the PRODUCTS page.
// TODO: This page should load a table of products to display for editing.
import ImageUpload from 'client/components/image-upload/image-upload';

// HOCs
import { withValidation } from 'client/hoc/auth';

class AdminProductsContainer extends Component {
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
        console.log('returned url: ', url);
    }

    render = () => {
        return (
            <div className="container-fluid">
                Admin Products.

                <ImageUpload type="box" onImageUploadSuccess={this.onImageUpload}>
                </ImageUpload>
            </div>
        );
    }
}

AdminProductsContainer.propTypes = {
    getAllContent: PropTypes.func,
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
    loading: PropTypes.bool,
    content: PropTypes.array,
    updateContent: PropTypes.func,
};

AdminProductsContainer.propTypes = {};

export default withValidation(AdminProductsContainer);
