import React, { PureComponent } from 'react';
import { get, uniqueId } from 'lodash';

// Components
import ProductMini from 'client/components/product/product-mini';

// Styles
import 'client/components/product/product-grid.less';

class ProductGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

	render = () => {
	    const hasProducts = get(this.props, 'products');

	    return (
	        <div className="product-grid">
	            {hasProducts &&
					this.props.products.map((product) => {
					    return (
					        <div className="product-cell" key={uniqueId()}>
					            <ProductMini product={product} />
					        </div>
					    );
					})}
	        </div>
	    );
	};
}

export default ProductGrid;
