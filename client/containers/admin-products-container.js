import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import ProductsTable from 'client/components/products-table/products-table';
import Spinner from 'client/components/spinner-v2/spinner-v2';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from 'client/components/button/button';
// import Snackbar from '@material-ui/core/Snackbar';
import PageHeader from 'client/components/page-header/page-header';
import ProductsTable from 'client/components/products-table/products-table';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProducts } from 'actions/products-actions';
import { deleteProduct, clearProduct } from 'actions/product-actions';

// Selectors
import { getProducts as getProductsSelector, getLoading } from 'selectors/products-selectors';

// HOCs
import { withAuthValidation } from 'client/hoc/auth';
import { withRouter } from 'react-router-dom';

// TODO: 1. Notifications on delete
// TODO: 2. Modals for confirmation dialog.

const AdminProductsContainer = ({ clearProduct, deleteProduct, getProducts, history, loading, products }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteAction = (confirmed) => {
    if (confirmed) {
      setDeletingProduct(true);

      (async () => {
        let notificationMessage;
        try {
          await deleteProduct(productToDelete.getId());
          await getProducts();
          notificationMessage = 'Product Successfully Deleted';
        } catch (error) {
          notificationMessage = 'An error occured while deleting the product, please try again.';
        } finally {
          setDeleteDialogOpen(false);
          setProductToDelete(null);
          setProductToDelete(false);
          // TODO: Pop notification
        }
      })();
    } else {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = (product) => {
    setDeleteDialogOpen(true);
    setProductToDelete(product);
  };

  const handleCreateProduct = () => {
    clearProduct().then(() => {
      history.push('/admin-product');
    });
  };

  const spinning = loading || deletingProduct;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <PageHeader
            headerText="Edit Product"
            buttonText="Create Product"
            onButtonClick={handleCreateProduct}
          />
        </div>
      </div>
      <Spinner spinning={spinning}>
        <ProductsTable
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
      </Spinner>
    </div>
  );
};

AdminProductsContainer.propTypes = {
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  loading: PropTypes.bool,
  products: PropTypes.array,
  deleteProduct: PropTypes.func,
  getProducts: PropTypes.func,
  clearProduct: PropTypes.func,
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
  clearProduct,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(withRouter(AdminProductsContainer))),
  loadData: (store) => store.dispatch(getProducts()),
};
