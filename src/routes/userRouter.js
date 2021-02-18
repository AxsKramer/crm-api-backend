const {Router} = require('express');
const auth = require('../middleware/auth');

const router = Router();

router.post('/create-account', registerUser);
router.post('/login', loginUser);


module.exports = router;