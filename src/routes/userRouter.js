const { Router } = require("express");
const { getUsers, registerUser, loginUser,deleteUser } = require("../controllers/userController");
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, getUsers)
router.post("/create-account", auth, registerUser);
router.post("/login", loginUser);
router.delete("/delete-user/:userId",auth, deleteUser);

module.exports = router;
