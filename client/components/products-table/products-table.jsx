import React from 'react';

import Table from '@components/table/table';
import TableHead from '@components/table/table-head';
import TableBody from '@components/table/table-body';
import TableRow from '@components/table/table-row';
import TableCell from '@components/table/table-cell';
import ProductsTableRow from '@components/products-table/products-table-row';

// Styles
import styles from '@components/products-table/products-table.scss';


const ProductsTable = ({ handleDeleteProduct, products }) => {
  
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
          return (
            <ProductsTableRow
              key={product.getId()}
              handleDeleteProduct={handleDeleteProduct}
              product={product}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
