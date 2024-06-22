const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', (req, res) => {
  console.log('GET /products endpoint hit');
  productController.getAllProducts(req, res);
});
router.get('/products/:id', (req, res) => {
  console.log(`GET /products/${req.params.id} endpoint hit`);
  productController.getProductById(req, res);
});
router.post('/products', (req, res) => {
  console.log('POST /products endpoint hit');
  productController.createProduct(req, res);
});
router.put('/products/:id', (req, res) => {
  console.log(`PUT /products/${req.params.id} endpoint hit`);
  productController.updateProduct(req, res);
});
router.delete('/products/:id', (req, res) => {
  console.log(`DELETE /products/${req.params.id} endpoint hit`);
  productController.deleteProduct(req, res);
});

router.delete('/products', productController.deleteAllProducts);
router.get('/products/search/:keyword', productController.searchProductsByName);

module.exports = router;
