import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, uniqueId } from 'lodash';

// Components
import ProductMini from '@components/product/product-mini';

// Styles
import styles from '@components/product/product-grid.module.scss';


// Utils
import { observerIsIntersecting } from 'client/utils/observers';

const ProductGrid = (props) => {
  
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
    // NOTE: Turning off the intersection observer for now.
    // setObservers();
  });

  const hasProducts = get(props, 'products');

  return (
    <div className={styles.ProductGrid}>
      {hasProducts &&
        props.products.map((product) => {
          const miniProduct = (
            <div
              ref={myRefs[`product${product.getId()}`]}
              // className={styles.Hidden} // NOTE: Turning off the intersection observer for now.
              className={styles.Show}
              key={uniqueId()}
            >
              <ProductMini product={product} onAddToCart={props.onAddToCart} />
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
