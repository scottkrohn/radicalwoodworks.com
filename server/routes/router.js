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
  .post(require('../controllers/product-controller'));

router.route('/products/update')
  .put(require('../controllers/product-controller'));

router.route('/products/image/:productId')
  .post(require('../controllers/product-image-upload-controller'));

// Image Routes
router.route('/images/:imageId')
  .all(require('../controllers/images-controller'));

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

router.route('/signup')
	.post(require('../controllers/signup-controller'));

router.route('/login')
  .post(require('../controllers/auth-controller'));

router.route('/logout')
  .put(require('../controllers/auth-controller'));

router.route('/verify')
  .all(require('../controllers/admin-controller'));

module.exports = router;
