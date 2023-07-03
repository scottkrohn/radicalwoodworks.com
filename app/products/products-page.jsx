'use client';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

// Components
import ProductGrid from '@components/product/product-grid';
import PageHeader from '@components/page-header/page-header';
import Spinner from '@components/spinner/spinner';

// Actions
import { getProducts } from '@actions/products-actions';
import { addOrUpdateCartItem, createCart } from '@actions/cart-actions';

// Selectors
import {
  getProducts as getProductsSelector,
  getLoading,
} from '@selectors/products-selectors';
import {
  selectCart,
  getLoading as getCartLoading,
} from 'client/selectors/cart-selectors';
import { selectUser } from '@selectors/user-selectors';

const ProductsContainer = ({
  addOrUpdateCartItem,
  cart,
  createCart,
  getProducts,
  loading,
  products,
  user,
}) => {
  useEffect(() => {
    if (isEmpty(products)) {
      console.log("GETTING");
      getProducts();
    }
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (isEmpty(cart)) {
      const userId = user ? user.getId() : null;
      createCart(product.getId(), quantity, userId);
    } else {
      addOrUpdateCartItem(cart.getId(), product.getId(), quantity);
    }
  };

  const productsLength = get(products, 'length', 0);
  const productsLoaded = productsLength > 0;

  return (
    <div className="container-fluid">
      <div className="col-12">
        {/*<Spinner spinning={loading} />*/}
        {/*<PageHeader*/}
        {/*  headerText="Radical Woodworks Products"*/}
        {/*  showButton={false}*/}
        {/*/>*/}
      </div>

      {/*{productsLoaded && (*/}
      {/*  <ProductGrid products={products} onAddToCart={handleAddToCart} />*/}
      {/*)}*/}
    </div>
  );
};

ProductsContainer.propTypes = {
  getProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    products: getProductsSelector(state),
    loading: getLoading(state) || getCartLoading(state),
    cart: selectCart(state),
    user: selectUser(state),
  };
};

const mapActionsToProps = {
  addOrUpdateCartItem,
  createCart,
  getProducts,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductsContainer);

// export default {
//   component: connect(mapStateToProps, mapActionsToProps)(ProductsContainer),
//   loadData: (store) => store.dispatch(getProducts()),
// };
