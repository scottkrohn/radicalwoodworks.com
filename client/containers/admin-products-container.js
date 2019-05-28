import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductsTable from 'client/components/products-table/products-table';
import Spinner from 'client/components/spinner/spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from 'client/components/base/button/button';
import Snackbar from '@material-ui/core/Snackbar';
import PageHeader from 'client/components/page-header/page-header';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProducts } from 'actions/products-actions';
import { deleteProduct } from 'actions/product-actions';

// Selectors
import { getProducts as getProductsSelector, getLoading } from 'selectors/products-selectors';

// HOCs
import { withValidation } from 'client/hoc/auth';

class AdminProductsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteDialogOpen: false,
      productToDelete: null,
      deletingProduct: false,
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

      await this.props.getProducts();
    })();
  };

  handleDeleteAction = (confirmed) => {
    if (confirmed) {
      this.setState({ deletingProduct: true }, () => {
        (async () => {
          let notificationMessage;
          try {
            await this.props.deleteProduct(this.state.productToDelete.getId());
            await this.props.getProducts();
            notificationMessage = 'Product Successfully Deleted';
          } catch (error) {
            notificationMessage = 'An error occured while deleting the product, please try again.';
          } finally {
            this.setState({
              deleteDialogOpen: false,
              productToDelete: null,
              deletingProduct: false,
              showNotification: true,
              notificationMessage,
            });
          }
        })();
      });
    } else {
      this.setState({
        productToDelete: null,
        deleteDialogOpen: false,
      });
    }
  };

  handleCloseDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: false,
      productToDelete: null,
    });
  };

  handleDeleteProduct = (product) => {
    this.setState({
      deleteDialogOpen: true,
      productToDelete: product,
    });
  };

  handleHideNotification = () => {
    this.setState({
      showNotification: false,
    });
  };

  render = () => {
    const loading = this.props.loading || this.state.deletingProduct;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <PageHeader
              headerText="Edit Product"
              showButton={false}
            />
          </div>
        </div>
        <Spinner spinning={loading}>
          <ProductsTable handleDeleteProduct={this.handleDeleteProduct} products={this.props.products} />
          <Dialog open={this.state.deleteDialogOpen} onClose={this.handleCloseDeleteDialog}>
            <DialogTitle>Confirm Delete Product</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained" color="cancel"
                slim onClick={() => this.handleDeleteAction(false)}
              >
                Nevermind
              </Button>
              <Button
                variant="contained" color="save"
                slim onClick={() => this.handleDeleteAction(true)}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
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

AdminProductsContainer.propTypes = {
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  loading: PropTypes.bool,
  products: PropTypes.array,
  deleteProduct: PropTypes.func,
  getProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProductsSelector(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  verifyLogin,
  getProducts,
  deleteProduct,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withValidation(AdminProductsContainer));
