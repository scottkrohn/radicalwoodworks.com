import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import NavLink from 'client/components/nav/nav-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from 'client/components/products-table/products-table-row.less';

class ProductsTableRow extends PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <TableRow hover>
                <TableCell>{this.props.product.getTitle()}</TableCell>
                <TableCell>${this.props.product.getPrice().toFixed(2)}</TableCell>
                <TableCell>${this.props.product.getShippingPrice().toFixed(2)}</TableCell>
                <TableCell>{this.props.product.getIncludeShippingInPrice() ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                    <NavLink to="/admin-product-container">
                        <FontAwesomeIcon
                            icon={faEdit}
                            className={styles.ActionIcon}
                        />
                    </NavLink>
                    <FontAwesomeIcon
                        onClick={() => this.props.handleDeleteProduct(this.props.product)}
                        icon={faTrash}
                        className={styles.ActionIcon}
                    />
                </TableCell>
            </TableRow>
        );
    };
}

ProductsTableRow.propTypes = {
    product: PropTypes.object,
    handleDeleteProduct: PropTypes.func,
};

export default ProductsTableRow;
