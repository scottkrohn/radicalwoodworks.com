import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

// Components
// import ProductGrid from 'client/components/product/product-grid';

// Actions
import { getProducts } from 'actions/products-actions';

// Selectors
import { getProducts as getProductsSelector, getLoading } from 'selectors/products-selectors';

const ProductsContainer = ({ getProducts, loading, products }) => {
  // componentDidMount = () => {
  //   if (isEmpty(products)) {
  //     getProducts();
  //   }
  // };

  useEffect(() => {
    if (isEmpty(products)) {
      getProducts();
    }
  }, []);

  const productsLength = get(products, 'length', 0);
  const productsLoaded = productsLength > 0;

  return (
    <div className="container-fluid">
      I'm the products page.
        {/* <div className="col-12">
          <div className="text-center">
            <h1>Radical Woodworks Products</h1>
          </div>
        </div>

        {productsLoaded && <ProductGrid products={products} />} */}
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
  loadData: (store) => {console.log('called'); return store.dispatch(getProducts())},
};
