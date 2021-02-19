const {Router} = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
  uploadFile} = require('../controllers/productController');

const router = Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', uploadFile, createProduct);
router.post('/search/:query', searchProduct);
router.put('/:productId', uploadFile, updateProduct);
router.delete('/:productId', deleteProduct);


module.exports = router;