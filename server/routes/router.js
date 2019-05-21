const express = require('express');
const router = express.Router();

// Products Routes
router.route('/products/:productId')
    .get(require('../controllers/products-controller'))
    .delete(require('../controllers/product-controller'));

// Product Routes
router.route('/products')
    .get(require('../controllers/products-controller'));

router.route('/products/create')
    .post(require('../controllers/product-controller'))

router.route('/products/update')
    .put(require('../controllers/product-controller'))

// Content Routes
router.route('/content/:contentType')
    .all(require('../controllers/content-controller'));

router.route('/content/update')
    .put(require('../controllers/content-controller'));

// Contact Routes
router.route('/contact/send')
    .all(require('../controllers/contact-controller'));

router.route('/image/upload')
    .post(require('../controllers/upload-controller'));

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
