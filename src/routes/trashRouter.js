const {Router} = require('express');
const {getAllDeletedItems} = require('../controllers');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, getAllDeletedItems);

module.exports = router;