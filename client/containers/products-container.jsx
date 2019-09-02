import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

// Components
import ProductGrid from 'client/components/product/product-grid';
import PageHeader from 'client/components/page-header/page-header';
import Spinner from '../components/spinner-v2/spinner-v2';

// Actions
import { getProducts } from 'actions/products-actions';

// Selectors
import { getProducts as getProductsSelector, getLoading } from 'selectors/products-selectors';

const ProductsContainer = ({ getProducts, loading, products }) => {
  useEffect(() => {
    if (isEmpty(products)) {
      getProducts();
    }
  }, []);

  const productsLength = get(products, 'length', 0);
  const productsLoaded = productsLength > 0;

  return (
    <div className="container-fluid">
      <div className="col-12">
        <Spinner spinning={loading} />
        <PageHeader
          headerText="Radical Woodworks Products"
          showButton={false}
        />
      </div>

      {productsLoaded && <ProductGrid products={products} />}
    </div>
  );
};

ProductsContainer.propTypes = {
  getProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProductsSelector(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  getProducts,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(ProductsContainer),
  loadData: (store) => store.dispatch(getProducts()),
};
