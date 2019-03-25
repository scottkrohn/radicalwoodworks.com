const express = require('express');
const router = express.Router();

router.route('/sample')
	.get(require('../controllers/sample-api-controller'));

module.exports = router;