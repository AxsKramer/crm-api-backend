const {Router} = require('express');
const {getAllDeletedItems} = require('../controllers/trashControler');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, getAllDeletedItems);

module.exports = router;