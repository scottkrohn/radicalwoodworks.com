const express = require('express');
const router = express.Router();

import adminCtrl from '@controller/admin-controller';
import authCtrl from '@controller/auth-controller';
import cartCtrl from '@controller/cart-controller';
import contactCtrl from '@controller/contact-controller';
import contentCtrl from '@controller/content-controller';
import imagesCtrl from '@controller/images-controller';
import productImageUploadCtrl from '@controller/product-image-upload-controller';
import productsCtrl from '@controller/products-controller';
import productCtrl from '@controller/product-controller';
import userCtrl from '@controller/user-controller';
import orderCtrl from '@controller/order-controller';
import checkoutCtrl from '@controller/checkout-controller';

// Products Routes
router.route('/products/:productId').get(productsCtrl).delete(productCtrl);

// Product Routes
router.route('/products').get(productsCtrl);

router.route('/products/create').post(productCtrl);

router.route('/products/update').put(productCtrl);

router.route('/products/image/:productId').post(productImageUploadCtrl);

// Image Routes
router.route('/images/:imageId').all(imagesCtrl);

// Content Routes
router.route('/content/:contentType').all(contentCtrl);

router.route('/content/update').put(contentCtrl);

// Contact Routes
router.route('/contact/send').all(contactCtrl);

// Cart Routes
router.route('/cart/:cartId?').all(cartCtrl);

// Order Routes
router.route('/order/:orderId?').all(orderCtrl);

// Checkout Routes
router.route('/checkout/address/:orderId').all(checkoutCtrl);

// User Routes
router.route('/signup').post(userCtrl);
router.route('/user').put(userCtrl);

// /* Authentication Routes
// /***********************/

router.route('/login').post(authCtrl);

router.route('/logout').put(authCtrl);

router.route('/verify').all(adminCtrl);

export default router;
