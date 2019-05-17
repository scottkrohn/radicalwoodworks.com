import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Move this to the PRODUCT page, not the PRODUCTS page.
// TODO: This page should load a table of products to display for editing.
import ImageUpload from 'client/components/image-upload/image-upload';

class AdminProductContainer extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="container-fluid">
                Admin Products.

                <ImageUpload />
            </div>
        );
    }
}

AdminProductContainer.propTypes = {};

export default AdminProductContainer;
