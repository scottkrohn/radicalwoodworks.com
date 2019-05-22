import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import EditImages from 'client/components/edit-images/edit-images';
import Spinner from 'client/components/spinner/spinner';

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

						const productId = get(this.props, 'match.params.productId');
						await this.props.getProduct(productId);

        })();
    };

    onImageUpload = (url) => {
        console.log(url);
    };

    render = () => {
        return (
            <div className="container-fluid">
                Admin Product Container

								<EditImages
									product={this.props.product}
									onImageUpload={this.onImageUpload}	
								/>
            </div>
        );
    };
}

AdminProductContainer.propTypes = {
    verifyLogin: PropTypes.func,
		redirectToHome: PropTypes.func,
		product: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        product: getProductSelector(state),
        loading: getLoading(state),
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
