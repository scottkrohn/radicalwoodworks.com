import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Models
import Product from 'model/product';

// Styles
import styles from 'client/components/product/item-info.less';

class ItemInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderItemDetails = () => {
        const product = get(this.props, 'product');
        if (!product) {
            return null;
        }

        const defaultColor = product.getDefaultColor();
        const frameWidth = product.getFrameWidth();

        const length = product.getLength();
        const width = product.getWidth();
        const validDimensions = length && width;

        const innerLength = length - frameWidth;
        const innerWidth = width - frameWidth;
        const validInnerDimensions = frameWidth && innerLength && innerWidth;

        return (
            <ul className={styles.ItemDetailsList}>
                {validDimensions && <li>{`Dimensions: ${length}" x ${width}"`}</li>}
                {validInnerDimensions && <li>{`Inner Dimensions: ${innerLength}" x ${innerWidth}"`}</li>}
                {defaultColor && <li>{`Default Color: ${defaultColor}`}</li>}
            </ul>
        );
    };

    render = () => {
        this.renderItemDetails();
        return (
            <div className="row">
                <div className="col-lg-9 col-md-12 text-center text-lg-left">
                    <div className={styles.Description}>
                        <h3 className={styles.DescriptionHeader}>Item Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: this.props.product.getDescription() }} />
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 text-center text-lg-left">
                    <div className={styles.HideDesktop}>
                        <hr />
                    </div>
                    <div className={styles.ItemDetails}>
                        <h3 className={styles.ItemDetailsHeader}>Details</h3>
                        {this.renderItemDetails()}
                    </div>
                </div>
            </div>
        );
    };
}

ItemInfo.propTypes = {
    product: PropTypes.instanceOf(Product),
};

export default ItemInfo;
