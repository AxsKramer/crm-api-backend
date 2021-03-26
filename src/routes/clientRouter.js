const { Router } = require("express");
const { getClients, getClientById, createClient, updateClient, deleteClient} = require("../controllers/clientController");
const auth = require('../middleware/auth');
const router = Router();

router.get("/", auth, getClients);
router.get("/:clientId", auth, getClientById);
router.post("/", auth, createClient);
router.put("/:clientId", auth, updateClient);
router.delete("/:clientId", auth, deleteClient);

module.exports = router;
