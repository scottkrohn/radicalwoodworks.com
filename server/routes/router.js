const express = require('express');
const router = express.Router();

import adminCtrl from '../controllers/admin-controller';
import authCtrl from '../controllers/auth-controller';
import contactCtrl from '../controllers/contact-controller';
import contentCtrl from '../controllers/content-controller';
import imagesCtrl from '../controllers/images-controller';
import productImageUploadCtrl from '../controllers/product-image-upload-controller';
import productsCtrl from '../controllers/products-controller';
import productCtrl from '../controllers/product-controller';
import signupCtrl from '../controllers/signup-controller';

// Products Routes
router.route('/products/:productId')
  .get(productsCtrl)
  .delete(productCtrl);

// Product Routes
router.route('/products')
  .get(productsCtrl);

router.route('/products/create')
  .post(productCtrl);

router.route('/products/update')
  .put(productCtrl);

router.route('/products/image/:productId')
  .post(productImageUploadCtrl);

// Image Routes
router.route('/images/:imageId')
  .all(imagesCtrl);

// Content Routes
router.route('/content/:contentType')
  .all(contentCtrl);

router.route('/content/update')
  .put(contentCtrl);

// Contact Routes
router.route('/contact/send')
  .all(contactCtrl);


// /* Authentication Routes
// /***********************/

router.route('/signup')
  .post(signupCtrl);

router.route('/login')
  .post(authCtrl);

router.route('/logout')
  .put(authCtrl);

router.route('/verify')
  .all(adminCtrl);

export default router;
