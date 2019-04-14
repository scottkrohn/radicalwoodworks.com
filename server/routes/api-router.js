const express = require('express');
const router = express.Router();

router.route('/products/product/:productId')
	.all(require('../controllers/products-controller'));

router.route('/products')
	.all(require('../controllers/products-controller'));

router.route('/content/content/:contentType')
	.all(require('../controllers/content-controller'));


module.exports = router;