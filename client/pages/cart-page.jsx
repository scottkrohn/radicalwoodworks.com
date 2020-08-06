import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { getCartById } from '@actions/cart-actions';
import { connect } from 'react-redux';
import { selectCart } from '@selectors/cart-selectors';
import PageHeader from 'client/components/page-header/page-header';
import { getProducts } from '@actions/products-actions';

const CartPage = ({ cart, getProducts }) => {
  const items = isEmpty(cart) ? [] : cart.getItems();

  useEffect(() => {
    const productIds = items.map((item) => item.getProductId());
    getProducts(productIds, true);
  }, []);

  return (
    <div className="container-fluid">
      <PageHeader headerText="Cart" showButton={false} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: selectCart(state) };
};

const mapActionsToProps = {
  getCartById,
  getProducts,
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(CartPage),
  loadData: (store, pathParts) => {
    return store.dispatch(getCartById(null));
  },
};
