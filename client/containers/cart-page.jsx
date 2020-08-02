import { isEmpty } from 'lodash';
import React from 'react';
import { getCartById } from '@actions/cart-actions';
import { connect } from 'react-redux';
import { selectCart } from '@selectors/cart-selectors';

const CartPage = ({ cart }) => {
  const items = isEmpty(cart) ? [] : cart.getItems();

  return (
    <div className="container-fluid">
      <h3>Cart Page</h3>
      <ul>
        {items.map((item) => {
          return <li>Product ID: {item.getProductId()}</li>;
        })}
      </ul>
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
  component: connect(mapStateToProps, {})(CartPage),
  loadData: (store, pathParts) => {
    return store.dispatch(getCartById(null));
  },
};
