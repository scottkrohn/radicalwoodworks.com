import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Spinner from '@components/spinner/spinner';
import PageHeader from '@components/page-header/page-header';
import ProductsTable from '@components/products-table/products-table';
import Notification from '../components/notification/notification';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProducts } from 'actions/products-actions';
import { deleteProduct, clearProduct } from 'actions/product-actions';

// Selectors
import {
  getProducts as getProductsSelector,
  getLoading,
} from 'selectors/products-selectors';

// HOCs
import { withAuthValidation } from 'client/hoc/auth';
import { withRouter } from 'react-router-dom';

import styles from '@pages/admin-products-page.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const AdminProductsContainer = ({
  clearProduct,
  deleteProduct,
  getProducts,
  history,
  loading,
  products,
}) => {
  useStyles(styles);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [notificationContent, setNotificationContent] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = (product) => {
    setDeletingProduct(true);
    (async () => {
      try {
        await deleteProduct(product.getId());
        await getProducts();
        setNotificationContent({
          header: 'Success!',
          message: 'Product successfully deleted!',
          showing: true,
        });
      } catch (error) {
        setNotificationContent({
          header: 'Error',
          message: 'An error occured deleting this product, please try again.',
          showing: true,
        });
      } finally {
        setDeletingProduct(false);
      }
    })();
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
            className={styles.AdminProductsPageHeader}
            headerText="Edit Products"
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
        <Notification
          content={notificationContent}
          hide={() => setNotificationContent({ showing: false })}
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
