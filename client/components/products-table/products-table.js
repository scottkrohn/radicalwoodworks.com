import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProductsTableRow from 'client/components/products-table/products-table-row';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Styles
import styles from 'client/components/products-table/products-table.less';

class ProductsTable extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><span className={styles.Text}>Name</span></TableCell>
            <TableCell><span className={styles.Text}>Price</span></TableCell>
            <TableCell><span className={styles.Text}>Shipping</span></TableCell>
            <TableCell><span className={styles.Text}>Free Shipping</span></TableCell>
            <TableCell><span className={styles.Text}>Total</span></TableCell>
            <TableCell><span className={styles.Text}>Actions</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.products.map((product) => {
            return (
              <ProductsTableRow
                key={product.getId()}
                handleDeleteProduct={this.props.handleDeleteProduct}
                product={product}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  };
}

ProductsTable.propTypes = {
  products: PropTypes.array,
  handleDeleteProduct: PropTypes.func,
};

export default ProductsTable;
