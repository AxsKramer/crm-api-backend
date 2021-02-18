const { Router } = require("express");
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = Router();

router.get("/", getClients);
router.get("/:clientId", getClientById);
router.post("/", createClient);
router.put("/:clientId", updateClient);
router.delete("/:clientId", deleteClient);

module.exports = router;
