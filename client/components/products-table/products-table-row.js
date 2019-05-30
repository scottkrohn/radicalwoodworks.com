import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import NavLink from 'client/components/nav/nav-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from 'client/components/products-table/products-table.less';

class ProductsTableRow extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {

    const iconClasses = classNames(styles.Cell, styles.Icons);

    return (
      <TableRow hover>
        <TableCell padding="none" align="left" className={styles.Cell}>
          <span className={styles.Text}>{this.props.product.getTitle()}</span>
        </TableCell>
        <TableCell padding="none" align="center" className={styles.Cell}>
          <span className={styles.Text}>${this.props.product.getPrice().toFixed(2)}</span>
        </TableCell>
        <TableCell padding="none" align="center" className={styles.Cell}>
          <span className={styles.Text}>${this.props.product.getShippingPrice().toFixed(2)}</span>
        </TableCell>
        <TableCell padding="none" align="center" className={styles.Cell}>
          <span className={styles.Text}>{this.props.product.getIncludeShippingInPrice() ? 'Yes' : 'No'}</span>
        </TableCell>
        <TableCell padding="none" align="center" className={styles.Cell}>
          <span className={styles.Text}>${this.props.product.getFinalPrice().toFixed(2)}</span>
        </TableCell>
        <TableCell padding="none" align="center" className={iconClasses}>
          <div className={styles.Icons}>
            <NavLink to={`/admin-product/${this.props.product.getId()}`}>
              <FontAwesomeIcon icon={faEdit} className={styles.ActionIcon} />
            </NavLink>
            <FontAwesomeIcon
              onClick={() => this.props.handleDeleteProduct(this.props.product)}
              icon={faTrash}
              className={styles.ActionIcon}
            />
          </div>
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
