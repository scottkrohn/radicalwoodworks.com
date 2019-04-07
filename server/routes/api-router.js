const express = require('express');
const router = express.Router();

router.route('/sample')
	.get(require('../controllers/sample-api-controller'));

router.route('/products/product/:productId')
	.all(require('../controllers/products-controller'));

router.route('/products')
	.all(require('../controllers/products-controller'));


module.exports = router;