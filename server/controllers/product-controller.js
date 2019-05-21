import { get } from 'lodash';

import ProductsBLI from '../classes/bli/products';
import Product from '../../model/product';

// Constants
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';

module.exports = (req, res, next) => {
    const productsBli = new ProductsBLI();

    const product = new Product();
    product.setValues(req.body.data);

    if (req.method === REQUEST.method.post) {
        if (!req.isAuthenticated()) {
            res.status(403).send(EXCEPTIONS.unauthorized);
            return;
        }

        productsBli.createProduct(product)
            .then((result) => {
                product.setId(result.insertId);
                res.send(product.getValues());
            })
            .catch((error) => {
                res.status(500).send(EXCEPTIONS.internalError);
            });
    } else if (req.method === REQUEST.method.put) {
        if (!req.isAuthenticated()) {
            res.status(403).send(EXCEPTIONS.unauthorized);
            return;
        }

        productsBli.updateProduct(product)
            .then((result) => {
                res.send(product.getValues());
            })
            .catch((error) => {
                res.status(500).send(EXCEPTIONS.internalError);
            });
    } else if (req.method === REQUEST.method.delete) {
        const productId = req.params.productId;
        productsBli.deleteProduct(productId)
            .then((result) => {
                res.send();
            })
            .catch((error) => {
                res.status(500).send(EXCEPTIONS.internalError);
            });
    } else {
        res.status(404).send(EXCEPTIONS.routeNotFound);
    }
};