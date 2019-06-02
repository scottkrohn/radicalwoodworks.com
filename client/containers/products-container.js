import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

// Components
import ProductGrid from 'client/components/product/product-grid';
import { Spin } from 'antd';

// Actions
import { getProducts } from 'actions/products-actions';

// Selectors
import { getProducts as getProductsSelector, getLoading } from 'selectors/products-selectors';

class ProductsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (isEmpty(this.props.products)) {
      this.props.getProducts();
    }
  };

  render = () => {
    const productsLength = get(this.props, 'products.length', 0);
    const productsLoaded = productsLength > 0;

    return (
      <div className="container-fluid">
        <Spin spinning={this.props.loading} size="large">
          <div className="col-12">
            <div className="text-center">
              <h1>Radical Woodworks Products</h1>

            </div>
          </div>

          {productsLoaded && <ProductGrid products={this.props.products} />}
        </Spin>
      </div>
    );
  };
}

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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductsContainer);
