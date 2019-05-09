const express = require('express');
const router = express.Router();

// Products Routes
router.route('/products/product/:productId')
    .all(require('../controllers/products-controller'));

// Product Routes
router.route('/products')
    .all(require('../controllers/products-controller'));

// Content Routes
router.route('/content/:contentType')
    .all(require('../controllers/content-controller'));

router.route('/content/update')
    .put(require('../controllers/content-controller'));

// Contact Routes
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
