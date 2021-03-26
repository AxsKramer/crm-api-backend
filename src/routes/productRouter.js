const {Router} = require('express');
const { getProducts, getProductById, createProduct, searchProduct, updateProduct, deleteProduct, uploadFile} = require('../controllers/productController');
const auth = require('../middleware/auth');
const router = Router();

router.get('/',auth, getProducts);
router.get('/:productId', auth, getProductById);
router.post('/', [auth,uploadFile], createProduct);
router.post('/search/:query',auth, searchProduct);
router.put('/:productId',[auth, uploadFile], updateProduct);
router.delete('/:productId',auth, deleteProduct);

module.exports = router;