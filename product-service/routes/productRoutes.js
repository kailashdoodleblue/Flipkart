const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/Encryptedproduct/:id', productController.getProductByIdEncrypted);
router.put('/reducestock/:id',productController.reducestock)

module.exports = router;
