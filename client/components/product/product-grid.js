import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get, uniqueId } from 'lodash';

// Components
import ProductMini from 'client/components/product/product-mini';

// Styles
import styles from 'client/components/product/product-grid.less';

const observe = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.Show);
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

class ProductGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.myRefs = {};
    this.props.products.forEach((product) => {
      const ref = React.createRef();
      this.myRefs[`product${product.getId()}`] = ref;
    });
  }

  setObservers = () => {
    for (const refKey in this.myRefs) {
      observe(this.myRefs[refKey].current);
    }
  };

  componentDidUpdate = () => {
    this.setObservers();
  };

  componentDidMount = () => {
    this.setObservers();
  };

  render = () => {
    const hasProducts = get(this.props, 'products');

    return (
      <div className={styles.ProductGrid}>
        {hasProducts &&
          this.props.products.map((product) => {
            const miniProduct = (
              <div
                ref={this.myRefs[`product${product.getId()}`]} className={styles.Hidden}
                key={uniqueId()}
              >
                <ProductMini product={product} />
              </div>
            );

            // observe(this.ref.current);

            return miniProduct;
          })}
      </div>
    );
  };
}

ProductGrid.propTypes = {
  products: PropTypes.array,
};

export default ProductGrid;
