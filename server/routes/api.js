const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const PersonController = require('../controllers/personController');
const authController = require('../controllers/authController');

router.use(authController.check_token);
router.get('/people', PersonController.all);
router.get('/products', ProductController.all);

module.exports = router;