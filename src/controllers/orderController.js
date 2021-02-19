const Order = require('../models/Order');

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({state: true}).populate('client').populate({path: order.product, model: 'Product'});
    res.status(200).json({ok: true, message: 'Orders listed', orders: orders});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
    next()
  }
}

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.find({_id: req.params.orderId}).populate('client').populate({path: order.product, model: 'Product'});
    
    if(!order){
      res.status(404).json({ok: false, message: 'This order does not exist'});
      next()
    }
    res.status(200).json({ok: true, message: 'Order found', order: order});

  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
    next()
  }
}

const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    await newOrder.save();
    res.status(201).json({ok: true, message: 'Order created'})
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
    next()
  } 
}

const updateOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndUpdate({_id: req.params.orderId}, req.body, {new: true}).populate('client').populate({
      path: 'order.product',
      model: 'Product'
    });
    res.status(200).json({ok: true, message: 'Order updated'});
  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
    next()
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById({_id: req.params.orderId});
    if(!order){
      res.status(404).json({ok: false, message: 'Order does not exist'});
      next();
    }
    order.state = false;
    await order.save();
    res.status(200).json({ok: true, message: 'Order deleted'});

  } catch (error) {
    res.status(500).json({ok: false, message: 'Internal Server Error', error: error.message});
    next();
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
}