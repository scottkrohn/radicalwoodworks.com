import React from 'react';

import Table from 'client/components/table/table';
import TableHead from 'client/components/table/table-head';
import TableBody from 'client/components/table/table-body';
import TableRow from 'client/components/table/table-row';
import TableCell from 'client/components/table/table-cell';
import ProductsTableRow from 'client/components/products-table/products-table-row';

// Styles
import styles from 'client/components/products-table/products-table.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ProductsTable = ({ handleDeleteProduct, products }) => {
  useStyles(styles);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <span className={styles.Text}>Name</span>
          </TableCell>
          <TableCell>
            <span className={styles.Text}>Price</span>
          </TableCell>
          <TableCell>
            <span className={styles.Text}>Shipping</span>
          </TableCell>
          <TableCell>
            <span className={styles.Text}>Free Shipping</span>
          </TableCell>
          <TableCell>
            <span className={styles.Text}>Total</span>
          </TableCell>
          <TableCell>
            <span className={styles.Text}></span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => {
          return <ProductsTableRow
            key={product.getId()}
            handleDeleteProduct={handleDeleteProduct}
            product={product}
                 />;
        })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
