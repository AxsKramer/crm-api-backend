const { Router } = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.post("/new/:userId", createOrder);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;
