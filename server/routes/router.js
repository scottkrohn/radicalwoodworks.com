const express = require('express');
const router = express.Router();

router.route('/products/product/:productId')
	.all(require('../controllers/products-controller'));

router.route('/products')
	.all(require('../controllers/products-controller'));

router.route('/content/content/:contentType')
	.all(require('../controllers/content-controller'));

router.route('/contact/send')
	.all(require('../controllers/contact-controller'));

/* Authentication Routes
/***********************/
// router.route('/signup')
// 	.post(require('../controllers/signup-controller'));

router.route('/login')
	.post(require('../controllers/auth-controller'));

router.route('/logout')
	.put(require('../controllers/auth-controller'));

router.route('/verify')
	.all(require('../controllers/admin-controller'));

module.exports = router;
