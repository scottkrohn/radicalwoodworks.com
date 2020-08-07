import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { getCartById } from '@actions/cart-actions';
import { connect } from 'react-redux';
import { selectCart } from '@selectors/cart-selectors';
import PageHeader from '@components/page-header/page-header';

const CartPage = ({ cart }) => {
  const items = isEmpty(cart) ? [] : cart.getItems();

  items.forEach((item) => {
    console.log(item);
  });

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
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(CartPage),
  loadData: (store, pathParts) => {
    return store.dispatch(getCartById(null, true));
  },
};
