import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProductsTableRow from 'client/components/products-table/products-table-row';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ProductsTable extends PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Shipping</TableCell>
                        <TableCell>Free Shipping(combined)</TableCell>
                        <TableCell>Actions</TableCell>
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
