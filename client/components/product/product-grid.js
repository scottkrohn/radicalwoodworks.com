import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, uniqueId } from 'lodash';

// Components
import ProductMini from 'client/components/product/product-mini';

// Styles
import styles from 'client/components/product/product-grid.less';
import useStyles from 'isomorphic-style-loader/useStyles';

// Utils
import { observerIsIntersecting } from 'client/utils/observers';

const ProductGrid = (props) => {
  useStyles(styles);
  const myRefs = {};
  props.products.forEach((product) => {
    const ref = useRef(null);
    myRefs[`product${product.getId()}`] = ref;
  });

  const setObservers = () => {
    for (const refKey in myRefs) {
      observerIsIntersecting(myRefs[refKey].current, (target) => {
        target.classList.add(styles.Show);
      });
    }
  };

  useEffect(() => {
    setObservers();
  });

  const hasProducts = get(props, 'products');

  return (
    <div className={styles.ProductGrid}>
      {hasProducts &&
        props.products.map((product) => {
          const miniProduct = (
            <div
              ref={myRefs[`product${product.getId()}`]} className={styles.Hidden}
              key={uniqueId()}
            >
              <ProductMini product={product} />
            </div>
          );

          return miniProduct;
        })}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array,
};

export default ProductGrid;
