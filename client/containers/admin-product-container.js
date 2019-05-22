import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import EditImages from 'client/components/edit-images/edit-images';
import Spinner from 'client/components/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';
import { getUploading } from 'client/selectors/image-upload-selector';

// HOCs
import { withValidation } from 'client/hoc/auth';

class AdminProductContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNotification: false,
            notificationMessage: '',
        };
    }

    componentDidMount = () => {
        (async () => {
            try {
                await this.props.verifyLogin();
            } catch (error) {
                this.props.redirectToHome();
            }

            const productId = get(this.props, 'match.params.productId');
            await this.props.getProduct(productId);
        })();
    };

    onImageUpload = (url) => {
        const productId = get(this.props, 'match.params.productId');
        this.props.getProduct(productId);
        this.handleShowNotification('test message');
    };

    handleShowNotification = (message) => {
        this.setState({
            showNotification: true,
            notificationMessage: message,
        });
    };

    handleHideNotification = () => {
        this.setState({
            showNotification: false,
        });
    };

    render = () => {
        const loading = this.props.productLoading || this.props.uploadingImage;

        return (
            <div className="container-fluid">
                <Spinner spinning={loading}>
                    <div className="col-xs-12 col-md-6">
                        <EditImages
                            product={this.props.product}
                            onImageUpload={this.onImageUpload}
                        />
                    </div>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={this.state.showNotification}
                        autoHideDuration={3000}
                        onClose={this.handleHideNotification}
                        message={<span>{this.state.notificationMessage}</span>}
                    />
                </Spinner>
            </div>
        );
    };
}

AdminProductContainer.propTypes = {
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
    getProduct: PropTypes.func,
    product: PropTypes.object,
    productLoading: PropTypes.bool,
    uploadingImage: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        product: getProductSelector(state),
        productLoading: getLoading(state),
        uploadingImage: getUploading(state),
    };
};

const mapActionsToProps = {
    verifyLogin,
    getProduct,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withValidation(AdminProductContainer));
