const { Router } = require("express");
const { registerUser, loginUser,deleteUser } = require("../controllers/userController");
const auth = require('../middleware/auth');

const router = Router();

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.delete("/delete-user/:userId",auth, deleteUser);

module.exports = router;
