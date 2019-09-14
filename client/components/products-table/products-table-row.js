import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import TableRow from 'client/components/table/table-row';
import TableCell from 'client/components/table/table-cell';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from 'client/components/products-table/products-table.less';
import useStyles from 'isomorphic-style-loader/useStyles';

// Constants
import IMAGES from 'client/constants/image-constants';

const ProductsTableRow = ({ handleDeleteProduct, product }) => {
  useStyles(styles);
  const iconClasses = classNames(styles.Cell, styles.Icons);
  const primaryImageUrl = product.getPrimaryImageUrl();

  return (
    <TableRow hover>
      <TableCell className={styles.Cell}>
        <img
          className={styles.TableImage}
          src={IMAGES.getFullUrl(primaryImageUrl)}
        />
      </TableCell>
      <TableCell className={styles.Cell}>
        <span className={styles.Text}>{product.getTitle()}</span>
      </TableCell>
      <TableCell className={styles.Cell}>
        <span className={styles.Text}>${product.getPrice().toFixed(2)}</span>
      </TableCell>
      <TableCell className={styles.Cell}>
        <span className={styles.Text}>${product.getShippingPrice().toFixed(2)}</span>
      </TableCell>
      <TableCell className={styles.Cell}>
        <span className={styles.Text}>{product.getIncludeShippingInPrice() ? 'Yes' : 'No'}</span>
      </TableCell>
      <TableCell className={styles.Cell}>
        <span className={styles.Text}>${product.getFinalPrice().toFixed(2)}</span>
      </TableCell>
      <TableCell className={iconClasses}>
        <div className={styles.Icons}>
          <Link to={`/admin-product/${product.getId()}`}>
            <FontAwesomeIcon
              icon={faEdit}
              className={styles.ActionIcon}
            />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDeleteProduct(product)}
            icon={faTrash}
            className={styles.ActionIcon}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

ProductsTableRow.propTypes = {
  product: PropTypes.object,
  handleDeleteProduct: PropTypes.func,
};

export default ProductsTableRow;
