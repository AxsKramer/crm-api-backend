const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = Router();

router.post("/create-account", registerUser);
router.post("/login", loginUser);

module.exports = router;
