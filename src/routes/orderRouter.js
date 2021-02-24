const { Router } = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require('../middleware/auth');

const router = Router();

router.get("/", auth, getOrders);
router.get("/:orderId", auth, getOrderById);
router.post("/new/:userId", auth, createOrder);
router.put("/:orderId", auth, updateOrder);
router.delete("/:orderId", auth, deleteOrder);

module.exports = router;
